import { instrument, InstrumentName, Player } from 'soundfont-player'

import BackingTrackSelector from '../modules/p5/components/BackingTrackSelector'
import SongSelector from '../modules/p5/components/SongSelector'
import { BackingTrack, SimpleSong } from '../modules/const'

export default class MusicPlayer {
  backingTrackSelector!: BackingTrackSelector
  songSelector!: SongSelector

  player!: Player
  ac!: AudioContext
  gainNode!: GainNode

  notePlaying: Player | null = null
  notePlayingName: string | null = null
  notePlayingTime: number | null = null

  chordPlaying: Player[] = []
  chordPlayingName: string[] = []

  backingTrackPlaying: string | null = null
  backingTrackSource: AudioBufferSourceNode | null = null

  activeChord: number = -1
  activeNote: number = -1
  playbackTimeouts: number[] = []

  async setup(
    backingTrackSelector: BackingTrackSelector,
    songSelector: SongSelector,
    instr: any,
  ) {
    this.backingTrackSelector = backingTrackSelector
    this.songSelector = songSelector

    this.ac = new AudioContext()
    this.gainNode = this.ac.createGain()

    this.player = await instrument(this.ac, instr as InstrumentName, {
      soundfont: 'FluidR3_GM',
    }).then((player: Player) => {
      console.log(`Soundfont player initialized.`)
      return player
    })

    this.player.connect(this.gainNode)

    this.backingTrackSource = this.ac.createBufferSource()
    this.backingTrackSource.connect(this.gainNode)

    this.gainNode.gain.setValueAtTime(0.5, this.ac.currentTime)
    this.gainNode.connect(this.ac.destination)
  }

  playRighthandNote(activeNote: number, notes: string[]) {
    if (activeNote < 0) {
      this.triggerNoteRelease()
      return
    }

    const idx = activeNote
    const fullNote = notes[idx]

    if (this.notePlayingName == fullNote) {
      if (this.noteHasBeenPlayingLongerThanDuration()) {
        this.startNoteLoop(fullNote)
      }
      return
    } else if (this.notePlaying == null) {
      this.triggerNotePressed(fullNote)
    } else {
      this.triggerNoteRelease()
      this.triggerNotePressed(fullNote)
    }
  }

  playLefthandChord(activeChord: number, notes: string[], majorScale: boolean) {
    if (this.backingTrackPlaying) {
      return
    }

    if (activeChord < 0) {
      this.triggerChordRelease()
      return
    }

    const idx = activeChord
    const offset = !majorScale && activeChord > 0 ? 1 : 0
    const chordNotes = [
      notes[(idx + offset) % 7],
      notes[(idx + 2 + offset) % 7],
      notes[(idx + 4 + offset) % 7],
    ]

    if (this.chordPlayingName[0] == chordNotes[0]) {
      return
    }

    if (this.chordPlaying.length) {
      this.triggerChordRelease()
    }

    this.triggerChordPressed(chordNotes)
  }

  async playBackingTrack(backingTrack: string, backingTrackInfo: BackingTrack) {
    const buffer = await fetch(`${backingTrack}.mp3`)
      .then((res) => res.arrayBuffer())
      .then((ArrayBuffer) => this.ac.decodeAudioData(ArrayBuffer))

    this.backingTrackSource = this.ac.createBufferSource()
    this.backingTrackSource.buffer = buffer
    this.backingTrackSource.connect(this.gainNode)
    this.backingTrackSource.start()

    setTimeout(() => {
      this.scheduleChordChanges(backingTrackInfo)
    }, ((backingTrackInfo.initialDelay * 60.0) / backingTrackInfo.bpm) * 1000)
  }

  playSong(song: SimpleSong) {
    // Calculate the time of one beat
    const beatTime = 60.0 / song.bpm

    // Calculate total duration of the chord sequence
    let totalDuration = 0
    song.notes.forEach((noteInfo) => {
      // Add duration of the note plus 100ms pause
      totalDuration += noteInfo.duration * beatTime + 0.1
    })

    // Function to schedule a chord change
    let currentTime = 0
    const scheduleNote = (note: number, durationInSeconds: number) => {
      const timeoutId = window.setTimeout(() => {
        this.activeNote = note
        // Schedule the note stop 100ms before the next note starts
        window.setTimeout(() => {
          this.activeNote = -1
        }, durationInSeconds * 1000 - 100)
      }, currentTime)

      this.playbackTimeouts.push(timeoutId)
      // Add the duration of the note plus a 100ms delay
      currentTime += durationInSeconds * 1000 + 100
    }

    song.notes.forEach((noteInfo) => {
      scheduleNote(noteInfo.note, noteInfo.duration * beatTime)
    })

    setTimeout(() => {
      this.stopSong()
    }, totalDuration * 1000)
  }

  scheduleChordChanges(backingTrackInfo: BackingTrack) {
    // Calculate the time of one beat
    const beatTime = 60.0 / backingTrackInfo.bpm

    // Calculate total duration of the chord sequence
    let totalDuration = 0
    backingTrackInfo.chords.forEach((chordInfo) => {
      totalDuration += chordInfo.duration * beatTime
    })

    // Function to schedule a chord change
    let currentTime = 0
    const scheduleChordChange = (chord: number, durationInSeconds: number) => {
      const timeoutId = window.setTimeout(() => {
        this.activeChord = chord
      }, currentTime)

      this.playbackTimeouts.push(timeoutId)
      currentTime += durationInSeconds * 1000
    }

    backingTrackInfo.chords.forEach((chordInfo) => {
      scheduleChordChange(chordInfo.chord, chordInfo.duration * beatTime)
    })

    // Loop the chord changes
    const loopTimeoutId = window.setTimeout(() => {
      this.scheduleChordChanges(backingTrackInfo)
    }, totalDuration * 1000)
    this.playbackTimeouts.push(loopTimeoutId)

    // Stop after 2 mins
    const finalTimeoutId = window.setTimeout(() => {
      this.stopBackingTrack()
    }, 120 * 1000)
    this.playbackTimeouts.push(finalTimeoutId)
  }

  async setInstrument(instr: any) {
    this.player = await instrument(this.ac, instr as InstrumentName, {
      soundfont: 'FluidR3_GM',
    }).then((player: Player) => {
      console.log(`Soundfont player initialized.`)
      return player
    })
    this.player.connect(this.gainNode)
  }

  getActiveNote() {
    return this.activeNote
  }

  getActiveChord() {
    return this.activeChord
  }

  mute() {
    this.gainNode.gain.setValueAtTime(-1.0, this.ac.currentTime)
  }

  unmute() {
    this.gainNode.gain.setValueAtTime(0.5, this.ac.currentTime)
  }

  stopBackingTrack() {
    if (this.backingTrackSource) {
      this.backingTrackSource.stop()
      this.backingTrackSource = null
    }

    this.activeChord = -1

    this.playbackTimeouts.forEach((timeoutId) => clearTimeout(timeoutId))
    this.playbackTimeouts = []
  }

  stopSong() {
    this.activeNote = -1
    this.playbackTimeouts.forEach((timeoutId) => clearTimeout(timeoutId))
    this.playbackTimeouts = []
  }

  triggerNotePressed(note: string) {
    this.notePlayingName = note
    this.notePlaying = this.player.play(note, this.ac.currentTime, {
      adsr: [0.2, 0.5, 0.5, 1.0],
    })
    this.notePlayingTime = this.ac.currentTime
  }

  triggerChordPressed(chordNotes: string[]) {
    for (let i = 0; i < chordNotes.length; i++) {
      this.chordPlaying.push(
        this.player.play(chordNotes[i], this.ac.currentTime, {
          adsr: [0.2, 0.5, 0.5, 1.0],
          loop: true,
        }),
      )
    }
    this.chordPlayingName = chordNotes
  }

  triggerNoteRelease() {
    if (this.notePlaying != null) {
      this.notePlaying.stop()
      this.notePlayingName = null
      this.notePlayingTime = null
    }
  }

  noteHasBeenPlayingLongerThanDuration() {
    const duration = 2.0
    return this.ac.currentTime - this.notePlayingTime! > duration
  }

  startNoteLoop(note: string) {
    this.notePlaying = this.player.play(note, this.ac.currentTime, {
      adsr: [0.2, 0.5, 0.5, 1.0],
    })
    this.notePlayingTime = this.ac.currentTime
  }

  triggerChordRelease() {
    if (this.chordPlaying.length) {
      for (let i = 0; i < this.chordPlaying.length; i++) {
        if (this.chordPlaying[i]) {
          this.chordPlaying[i].stop()
        }
      }
    }
    this.chordPlaying = []
    this.chordPlayingName = []
  }
}

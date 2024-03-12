# Theresim

Virtual instrument played with hands via webcam.

[Demo](https://theremin-one.vercel.app)

## Running The App Locally

This project uses [yarn](https://yarnpkg.com) to manage required dependencies.

* `yarn install` installs required packages.
* `yarn prepare` executes the extra step needed for seamless mediapipe integration.

### Development Build
* `yarn dev` starts the development build.

### Production Build
* `yarn build` build the production build.
* `yarn start` starts the production build.

## Adding Additional Songs

Add a case to `modules/const/simpleSongInformation`. 
The format for songs is:

```
title: 'kuža_pazi',
key: 'C',
major: true,
bpm: 90,
notes: [
    {
    note: 7,        // 7 is the second root on the keyboard, in this case second C
    duration: 1,    // in beats
    } as Note,
    .
    .
    .
],
```

Also add the song title (must be exactly the same as in the above-mentioned case)
to `modules/p5/components/SongSelector` to render it with p5.

```
    // Set desired rows and cols
    cols: number = 4
    rows: number = 1

    // Add the title
    songs: string[] = [
        'kuža_pazi',
        'twinkle',
        'happy_birthday',
        'ode_to_joy'
    ]
```

## Adding Additional Backing Tracks

Add a case to `modules/const/backingTrackInformation`.
The format for songs is:

```
case 'rock_ballad':
    return {
        key: 'B',
        major: false,
        bpm: 113,
        initialDelay: 2,    // if there is an intro, add the delay in beats
        chords: [
            {
            chord: 4,       // index of the chord (0 - 5)
            duration: 4,    // in beats
            } as Chord,
            .
            .
            .
        ]
    }
```

Also add the track title (must be exactly the same as in the above-mentioned case)
to `modules/p5/components/BackingTrackSelector` to render it with p5.

```
    // Set desired rows and cols
    cols: number = 4
    rows: number = 1

    // Add the title
     backingTracks: string[] = [
        'comfortably_numb',
        'shine_on',
        'planet_caravan',
        'rock_ballad',
    ]
```


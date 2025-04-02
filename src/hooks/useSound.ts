
import { useCallback } from "react";

// Create audio elements for different sounds
const createAudio = (src: string) => {
  const audio = new Audio(src);
  audio.volume = 0.5;
  return audio;
};

// Base64 encoded very small sound files
const popSoundBase64 = "data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
const successSoundBase64 = "data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAACEYAgAkABnh+cQAAWJAgggggSRJEmTJ0AAAAAAAAAAAAAABC6BUWLIIIIVkEJJZMmToAAAAAAAAAAAAAAELIIIIIQQQQQQkQQQhAgggggggggggggggggf/zQsQQAJAOBHjnpAgGgCH3POBAogggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg==";
const errorSoundBase64 = "data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAACUYADpAAIn9HAAAAAQkCgWQQQQQQQUkSZOgAAAAAAAAAAAAAABdg7DLIIIISyCEksmTJ0AAAAAAAAAAAAAAELSCCCCCCCCCCCCCCCCBAgggggQQQQQQQQQQQQP/zQsQJAFBF9HxnrCAGCxh1jM3wAQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ==";

const popAudio = createAudio(popSoundBase64);
const successAudio = createAudio(successSoundBase64);
const errorAudio = createAudio(errorSoundBase64);

export const useSound = () => {
  const playPop = useCallback(() => {
    // Clone the audio to allow multiple sounds to play simultaneously
    const sound = popAudio.cloneNode() as HTMLAudioElement;
    sound.play().catch(() => {});
  }, []);

  const playSuccess = useCallback(() => {
    const sound = successAudio.cloneNode() as HTMLAudioElement;
    sound.play().catch(() => {});
  }, []);

  const playError = useCallback(() => {
    const sound = errorAudio.cloneNode() as HTMLAudioElement;
    sound.play().catch(() => {});
  }, []);

  return { playPop, playSuccess, playError };
};

export default useSound;

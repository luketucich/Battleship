import battleSongLocation from "../assets/song.mp3";
const battleSong = new Audio(battleSongLocation);

export function playBattleSong() {
  battleSong.volume = 0.5;
  battleSong.play().catch((err) => console.log("Error playing song:", err));
  battleSong.loop = true;
}

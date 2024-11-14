import battleSongLocation from "../assets/battleSong.mp3";
import dockingSongLocation from "../assets/dockingSong.mp3";
const dockingSong = new Audio(dockingSongLocation);
const battleSong = new Audio(battleSongLocation);

export function playDockingSong() {
  dockingSong.volume = 0.5;
  dockingSong.play().catch((err) => console.log("Error playing song:", err));
  dockingSong.loop = true;
}

export function playBattleSong() {
  dockingSong.pause();
  battleSong.volume = 0.5;
  battleSong.play().catch((err) => console.log("Error playing song:", err));
  battleSong.loop = true;
}

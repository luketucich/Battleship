import battleSongLocation from "../assets/battleSong.mp3";
const battleSong = new Audio(battleSongLocation);
import { dockingSong } from "./menu.js";

export function playBattleSong() {
  dockingSong.pause();
  battleSong.volume = 0.5;
  battleSong.play().catch((err) => console.log("Error playing song:", err));
  battleSong.loop = true;
}

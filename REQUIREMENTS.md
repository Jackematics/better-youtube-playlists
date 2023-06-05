# better-youtube-playlists

An improved user experience for anyone who likes to listen to music using Youtube playlists but finds Youtube's current implementation lacking. 

## Requirements

### Playlist List

* PlaylistList UI
* Add Playlist Modal UI
* Default: Message prompting user to add a playlist. Message disappears if more than one item in the list
* Add playlist
	- On click, should raise a modal asking for the list url of a youtube playlist
	- Adding a list id and selecting the add button should add a playlist to the list of playlists
	- Selecting cancel button or clicking outside of the model should close the modal
	- Attempting to add an invalid video url should show an error prompt
* Select playlist
	- Should populate the playlist description and playlist items
	- Should reset configurations of all operations to default
	- Should reset youtube video iframe to default
* (Stretch) If playlists reach a max number implement a scroll

### Playlist Items

* Items UI
* Default: Empty container
* List playlist items of selected playlist
	- Item number, thumbnail, video title, video length
* Scroll through items
* Selecting an item highlights it
* Playlist titles beyond a certain character length move to the next line

### Video Player
* Default: show a graphic and prompt to add a playlist and select an item
* On playlist item select: display and play video corresponding to selected item
* On video end: move to the next playlist item
* On playlist end: stop

### Playlist Details

* Default: title only, No Playlist Selected
* On playlist selection: Show title, owner and number of videos

### Playlist Operations

* Shuffle: At the end of every video
	- Randomly select a new playlist item at the end of every video
	- Move list scroll down to the selected video
* Loop: At the end of the playlist, loop back to the first video in the playlist
* Search:
	- If input blank, return the whole list
	- If input not blank, return all items in the list that contains a word that matches the input
	- When a video is selected, reset the search to show the whole list, set the iframe to be the selected video, empty the input box, scroll to selected video in list.

### Stretch Goals

* Mobile UI
* Contact details
* Ads
* Merged playlists
* Individual video looping?
* Keyboard shortcuts if possible
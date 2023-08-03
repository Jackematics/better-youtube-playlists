# better-youtube-playlists

An improved user experience for anyone who likes to listen to music using Youtube playlists but finds Youtube's current implementation lacking.

## To Do

### Playlist List

- PlaylistList UI (Desktop) :white_check_mark:
- Add Playlist Modal UI (Desktop) :white_check_mark:
- Add playlist
  - On click, should raise a modal asking for the list url of a youtube playlist :white_check_mark:
  - Adding a list id and selecting the add button should add a playlist to the list of playlists :white_check_mark:
  - Selecting cancel button should close the modal :white_check_mark:
  - Attempting to add an invalid video url should show an error validation message :white_check_mark:
  - Attempting to add a duplicate playlist id should show an error validation message :white_check_mark:
  - Any issues with external services being called should show an error validation message :white_check_mark:
  - Elements outside of the modal while the modal is open should be unclickable :white_check_mark:
  - Playlist id input and validation messages should be cleared if the playlist is closed :white_check_mark:
  - (Stretch) Should show an error message if the user tries to add more than X playlists
- Select playlist
  - Should populate the playlist description and playlist items :white_check_mark:
  - Should reset youtube video iframe to default
- Cache: should cache playlist list data so users returning to the site will automatically have playlists loaded
- (Stretch) If playlists reach a max number implement a scroll

### Playlist Items

- Items UI :white_check_mark:
- Default: Empty container :white_check_mark:
- List playlist items of selected playlist :white_check_mark:
  - Item number, thumbnail, video title :white_check_mark:
- Scroll through items :white_check_mark:
- Selecting an item highlights it
- Playlist titles beyond a certain character length move to the next line :white_check_mark:

### Video Player

- Default: show a graphic and prompt to add a playlist and select an item
- On playlist item select: display and play video corresponding to selected item
- On video end: move to the next playlist item
- On playlist end: stop

### Playlist Details

- Default: title only, No Playlist Selected :white_check_mark:
- On playlist selection: Show title, owner and number of videos :white_check_mark:

### Playlist Operations

- Shuffle: At the end of every video
  - Randomly select a new playlist item at the end of every video
  - Move list scroll down to the selected video
- Loop: At the end of the playlist, loop back to the first video in the playlist
- Search:
  - If input blank, return the whole list
  - If input not blank, return all items in the list that contains a word that matches the input
  - When a video is selected, reset the search to show the whole list, set the iframe to be the selected video, empty the input box, scroll to selected video in list.

### Stretch Goals

- Mobile UI
- Contact details
- Ads
- Merged playlists
- Individual video looping?
- Keyboard shortcuts if possible

import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../app/page'

describe('When attempting to add a new playlist to the playlist list', () => {
  describe('AddPlaylistModal', () => {
    it('should be closed by default', () => {
      render(
        <Home />
      )
  
      const addPlaylistModal = screen.getByTestId('add-playlist-modal-wrapper')
  
      expect(addPlaylistModal).toHaveClass('hidden')
    })
    
    it('should open when the Add Playlist button is selected', () => {
      render(
        <Home />
      )
  
      const addPlaylistModal = screen.getByTestId('add-playlist-modal-wrapper')
      const addPlaylistButton = screen.getByRole("button", {name: /Add Playlist/i})
  
      fireEvent.click(addPlaylistButton);
  
      expect(addPlaylistModal).not.toHaveClass('hidden')
    })
  
    it('should close the modal if anywhere outside the modal is selected', () => {
      render(
        <Home />
      )
  
      const addPlaylistModal = screen.getByTestId('add-playlist-modal-wrapper')
      const addPlaylistButton = screen.getByRole("button", {name: /Add Playlist/i})
      const outsideModalElement = screen.getByText("Playlists")
  
      fireEvent.click(addPlaylistButton);
      fireEvent.click(outsideModalElement)
  
      expect(addPlaylistModal).toHaveClass('hidden')
    })

    it('should close the modal when cancel is clicked', () => {
      render(
        <Home />
      )
  
      const addPlaylistModal = screen.getByTestId('add-playlist-modal-wrapper')
      const addPlaylistButton = screen.getByRole("button", {name: /Add Playlist/i})
      const cancelButton = screen.getByRole("button", {name: /Cancel/i })
  
      fireEvent.click(addPlaylistButton);
      fireEvent.click(cancelButton)
  
      expect(addPlaylistModal).toHaveClass('hidden')
    })
  })
})
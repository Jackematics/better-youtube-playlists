import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../app/page'

describe('When attempting to add a new playlist to the playlist list', () => {
  describe('the AddPlaylistModal', () => {
    it('should be closed by default', () => {
      render(
        <Home />
      )
  
      const addPlaylistModal = screen.getByTestId('add-playlist-modal-wrapper')
  
      expect(addPlaylistModal).toHaveClass('hidden')
    })
    
  })


  it('should open when the Add Playlist button is selected', () => {
    render(
      <Home />
    )

    const addPlaylistModal = screen.getByTestId('add-playlist-modal-wrapper')
    const addPlaylistButton = screen.getByTestId("add-playlist-button")

    fireEvent.click(addPlaylistButton);

    expect(addPlaylistModal).not.toHaveClass('hidden')
  })
})
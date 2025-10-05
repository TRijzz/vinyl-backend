import { Router } from 'express';
import { requireAuth } from './auth.js';
import { createPlaylist, getMyPlaylists, getPlaylist, updatePlaylist, deletePlaylist, addSongToPlaylist, removeSongFromPlaylist } from './playlist.controller.js';

const router = Router();

router.post('/', requireAuth, createPlaylist);
router.get('/me', requireAuth, getMyPlaylists);
router.get('/:id', requireAuth, getPlaylist);
router.put('/:id', requireAuth, updatePlaylist);
router.delete('/:id', requireAuth, deletePlaylist);
router.post('/:id/songs', requireAuth, addSongToPlaylist);
router.delete('/:id/songs', requireAuth, removeSongFromPlaylist);

export default router;

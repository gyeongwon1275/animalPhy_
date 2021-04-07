import configureStore from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import postReducer,
{
  setError,
  setFormVisible,
  setImageFile,
  setPostText,
  writePost,
  setPostReset,
  loadImages,
  setImages,
  setPost,
  loadPost,
  setCommentBoxOpen,
  setComment,
  setComments,
  writeComment,
  loadComments,
} from '../postReducer';

import {
  getImages,
  getPost,
  postImage,
  sendPost,
  sendComment,
  getComments,
} from '../../services/api';

import { dataURLtoFile } from '../../utils/index';
import { mockComment } from '../../feature/mockData';

jest.mock('../../services/api');
jest.mock('../../utils');

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

describe('postReducer', () => {
  let store;

  describe('openPostForm', () => {
    it('changes setFormVisible', () => {
      const initialState = { formVisible: false };

      const state = postReducer(initialState, setFormVisible(true));

      expect(state.formVisible).toBe(true);
    });
  });

  describe('setImageFile', () => {
    it('changes imageFile', () => {
      const initialState = { imageFile: null };

      const readerResult = 'data:image/gif,abcd';
      const name = 'dog.gif';

      const { imageFile } = postReducer(initialState, setImageFile({ readerResult, name }));

      expect(imageFile.readerResult).toBe(readerResult);
      expect(imageFile.name).toBe(name);
    });
  });

  describe('setPostText', () => {
    it('changes text', () => {
      const initialState = { text: '' };

      const state = postReducer(initialState, setPostText('강아지'));

      expect(state.text).toBe('강아지');
    });
  });

  describe('setPostReset', () => {
    it('resets text, imageFile', () => {
      const initialState = {
        imageFile: { readerResult: 'data:image/gif,abcd', name: 'dog.gif' },
        text: 'this is a dog',
      };

      const { text, imageFile } = postReducer(initialState, setPostReset());

      expect(text).toBe('');
      expect(imageFile.readerResult).toBe('');
      expect(imageFile.name).toBe('');
    });
  });

  describe('setPost', () => {
    it('changes post', () => {
      const initialState = {
        post: null,
      };

      const { post } = postReducer(initialState, setPost([]));
      expect(post).not.toBeNull();
    });
  });

  describe('setCommentBoxOpen', () => {
    it('changes commentBoxOpen', () => {
      const initialState = { commentBoxOpen: false };

      const state = postReducer(initialState, setCommentBoxOpen());

      expect(state.commentBoxOpen).toBe(true);
    });
  });

  describe('setComment', () => {
    it('changes comment', () => {
      const initialState = { comment: '' };

      const state = postReducer(initialState, setComment('댓글'));

      expect(state.comment).toBe('댓글');
    });
  });

  describe('setComments', () => {
    it('changes comments', () => {
      const initialState = { comments: [] };

      const state = postReducer(initialState, setComments([mockComment]));

      expect(state.comments[0]).toMatchObject(mockComment);
    });
  });

  describe('setError', () => {
    it('changes error', () => {
      const initialState = { error: '' };

      const state = postReducer(initialState, setError('error'));

      expect(state.error).toBe('error');
    });
  });

  describe('writePost', () => {
    const initialState = {
      formVisible: false,
      imageFile: { readerResult: 'image/gif;base64,R0lGODlhYwETAfZ/ABQJCohWK', name: 'dog' },
      text: '개입니다',
      error: '',
      posts: [],
      images: [],
    };

    context('when error not occuered', () => {
      beforeEach(() => {
        jest.clearAllMocks();

        dataURLtoFile.mockImplementationOnce(() => 'imageFile');
        postImage.mockImplementationOnce(() => Promise.resolve({ url: 'image-url' }));
        sendPost.mockImplementationOnce(() => Promise.resolve());
        getImages.mockImplementationOnce(() => Promise.resolve([]));

        store = mockStore({
          post: initialState,
        });
      });

      it('runs setImages', async () => {
        await store.dispatch(writePost());

        const actions = store.getActions();
        expect(actions[0]).toEqual(setImages([]));
      });
    });

    context('when error occuered', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        postImage.mockImplementationOnce(() => Promise.resolve({ url: 'image-url' }));
        sendPost.mockImplementationOnce(() => Promise.resolve());

        const mockError = { message: 'error' };
        getImages.mockImplementationOnce(() => Promise.reject(mockError));

        store = mockStore({
          post: initialState,
        });
      });

      it('runs setError', async () => {
        await store.dispatch(writePost());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setError('error'));
      });
    });
  });

  describe('loadImages', () => {
    context('when error not occuered', () => {
      beforeEach(() => {
        jest.clearAllMocks();

        getImages.mockImplementationOnce(() => Promise.resolve([]));

        store = mockStore({
          post: {
            images: [],
          },
        });
      });

      it('runs setImages', async () => {
        await store.dispatch(loadImages());
        const actions = store.getActions();

        expect(actions[0]).toEqual(setImages([]));
      });
    });

    context('when error occuered', () => {
      beforeEach(() => {
        jest.clearAllMocks();

        const mockError = { message: 'error' };
        getImages.mockImplementationOnce(() => Promise.reject(mockError));

        store = mockStore({
          post: {
            images: [],
          },
        });
      });
      it('runs setError', async () => {
        await store.dispatch(loadImages());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setError('error'));
      });
    });
  });

  describe('loadPost', () => {
    context('when error not occuered', () => {
      beforeEach(() => {
        jest.clearAllMocks();

        getPost.mockImplementationOnce(() => Promise.resolve([]));

        store = mockStore({
          post: {
            post: null,
          },
        });
      });

      it('runs setPost', async () => {
        await store.dispatch(loadPost(1));
        const actions = store.getActions();

        expect(actions[0]).toEqual(setPost([]));
      });
    });

    context('when error occuered', () => {
      beforeEach(() => {
        jest.clearAllMocks();

        const mockError = { message: 'error' };
        getPost.mockImplementationOnce(() => Promise.reject(mockError));

        store = mockStore({
          post: {
            post: null,
          },
        });
      });
      it('runs setError', async () => {
        await store.dispatch(loadPost(1));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setError('error'));
      });
    });
  });

  describe('loadComments', () => {
    beforeAll(() => {});
    context('when commentBox not opened', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        getComments.mockImplementation(() => Promise.resolve([]));

        store = mockStore({
          post: {
            comments: [],
            commentBoxOpen: false,
          },
        });
      });

      it("doesn't run ", async () => {
        await store.dispatch(loadComments(1));
        const actions = store.getActions();

        expect(actions).toEqual([]);
      });
    });

    context('when error not occurred', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        getComments.mockImplementation(() => Promise.resolve([]));

        store = mockStore({
          post: {
            comments: [],
            commentBoxOpen: true,
          },
        });
      });

      it('runs setComments', async () => {
        await store.dispatch(loadComments(1));
        const actions = store.getActions();

        expect(actions[0]).toEqual(setComments([]));
      });
    });

    context('when error occurred', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        const mockError = { message: 'error' };
        getComments.mockImplementation(() => Promise.reject(mockError));

        store = mockStore({
          post: {
            comments: [],
            commentBoxOpen: true,
          },
        });
      });

      it('runs setError', async () => {
        await store.dispatch(loadComments(1));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setError('error'));
      });
    });
  });

  describe('writeComment', () => {
    context('when error not occurred', () => {
      beforeEach(() => {
        jest.clearAllMocks();

        sendComment.mockImplementationOnce(() => Promise.resolve());
        getComments.mockImplementation(() => Promise.resolve([]));
        store = mockStore({
          post: {
            post: null,
            comment: '댓글!',
            commentBoxOpen: true,
          },
        });
      });

      it('runs setComments, setComment', async () => {
        await store.dispatch(writeComment(1));
        const actions = store.getActions();

        expect(actions[0]).toEqual(setComments([]));
        expect(actions[1]).toEqual(setComment(''));
      });
    });

    context('when error occurred', () => {
      beforeEach(() => {
        jest.clearAllMocks();

        const mockError = { message: 'error' };
        sendComment.mockRejectedValue((mockError));
        getComments.mockRejectedValue(mockError);

        store = mockStore({
          post: {
            post: null,
            comment: '댓글!',
          },
        });
      });

      it('runs setError', async () => {
        await store.dispatch(writeComment(1));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setError('error'));
      });
    });
  });
});

import { create } from 'zustand';

type State = {
  textId: number |null;
  title: string;
  content: string;
  sidebarEdit: boolean;
  titleEdit: boolean;
  contentEdit: boolean;
};

type Action = {
  updateTextId: (textId: State['textId']) => void;
  updateTitle: (title: State['title']) => void;
  updateContent: (content: State['content']) => void;
  toggleSidebarEdit: (sidebarEdit: State['sidebarEdit']) => void;
  toggleTitleEdit: (titleEdit: State['titleEdit']) => void;
  toggleContentEdit: (contentEdit: State['contentEdit']) => void;
};

export const useStore = create<Action & State>(set => ({
  textId: null,
  title: '',
  content: '',
  sidebarEdit: false,
  titleEdit: false,
  contentEdit: false,
  updateTextId: newTextId => set(() => ({ textId: newTextId })),
  updateTitle: newTitle => set(() => ({ title: newTitle })),
  updateContent: newContent => set(() => ({ content: newContent })),
  toggleSidebarEdit: toggleSidebarEdit =>
    set(() => ({ sidebarEdit: toggleSidebarEdit })),
  toggleTitleEdit: toggleTitleEdit =>
    set(() => ({ titleEdit: toggleTitleEdit })),
  toggleContentEdit: toggleContentEdit =>
    set(() => ({ contentEdit: toggleContentEdit })),
}));

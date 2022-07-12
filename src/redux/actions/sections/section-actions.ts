import CyrillicToTranslit from "cyrillic-to-translit-js";

export const sectionActions = {
  addSection: (state: MailboxInitialState, action: Action) => {
    const newBoxId = CyrillicToTranslit()
      .transform(action.payload.name, "_")
      .toLowerCase();
    const newBox = {
      name: action.payload.name,
      id: newBoxId,
      slug: newBoxId,
      letters: [],
    };
    state.customSections = [...state.customSections, newBox];
  },
};

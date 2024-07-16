const CONFIG = {
  moduleId: "maji-module-journal-styling",
  journalFlag: "majiJournal",
  cssClass: "maji",
};
Hooks.once("init", async function () {
  Hooks.on("renderJournalSheet", (app, html, data) => {
    const journal = app.document;
    //TODO replace moduleId and cssClass
    /* //TODO replace with custom type flags
    flags": {
    "pf2e-abomination-vaults": {
      "isAV": true
    },
    */
    if (journal.getFlag(CONFIG.moduleId, CONFIG.journalFlag))
      html[0].classList.add(CONFIG.cssClass);
  });

  Hooks.on("getSidebarTabFolderContext", (_html, options, journal) => {
    options.push({
      condition: true,
      icon: "",
      name: "journal.TAG",
      callback: async (header) => {
        journal.setFlag(
          CONFIG.moduleId,
          CONFIG.journalFlag,
          !journal.getFlag(CONFIG.moduleId, CONFIG.journalFlag)
        );
        //TODO maybe support multiple type s of styling (just a different color)
      },
    });
  });

  Hooks.on("renderJournalPageSheet", (app, html, data) => {
    const journal = app.document.parent;
    if (journal.getFlag(CONFIG.moduleId, CONFIG.journalFlag))
      html[0].classList.add(CONFIG.cssClass);
  });

  Hooks.on("getProseMirrorMenuDropDowns", (menu, dropdowns) => {
    const toggleMark = foundry.prosemirror.commands.toggleMark;
    const wrapIn = foundry.prosemirror.commands.wrapIn;
    if ("format" in dropdowns) {
      dropdowns.format.entries.push({
        action: "maji-journal-style",
        title: "Maji",
        children: [
          {
            action: "maji-box-text-narrative",
            class: "box-text narrative",
            title: "Box Text, Narrative",
            mark: menu.schema.nodes.paragraph,
            attrs: { _preserve: { class: "box-text narrative" } },
            priority: 0,
            cmd: () => {
              menu._toggleTextBlock(menu.schema.nodes.paragraph, {
                attrs: { _preserve: { class: "box-text narrative" } },
              });
              return true;
            },
          },
          {
            action: "maji-float-block",
            class: "maji-float-block",
            title: "Float Block",
            mark: menu.schema.nodes.aside,
            attrs: { _preserve: { class: "maji-float-block" } },
            priority: 0,
            cmd: () => {
              menu._toggleTextBlock(menu.schema.nodes.aside, {
                attrs: { _preserve: { class: "maji-float-block" } },
              });
              return true;
            },
          },
          {
            action: "pf2e-inline-header",
            class: "inline-header",
            title: "Inline Header",
            node: menu.schema.nodes.heading,
            attrs: { _preserve: { class: "inline-header" }, level: 4 },
            priority: 0,
            cmd: () => {
              menu._toggleTextBlock(menu.schema.nodes.heading, {
                attrs: { _preserve: { class: "inline-header" }, level: 4 },
              });
              return true;
            },
          },
          {
            action: "pf2e-info-block",
            class: "info",
            title: "Info Block",
            node: menu.schema.nodes.section,
            attrs: { _preserve: { class: "info" } },
            priority: 1,
            cmd: () => {
              menu._toggleBlock(menu.schema.nodes.section, wrapIn, {
                attrs: { _preserve: { class: "info" } },
              });
              return true;
            },
          },
          {
            action: "pf2e-stat-block",
            class: "statblock",
            title: "Stat Block",
            node: menu.schema.nodes.section,
            attrs: { _preserve: { class: "statblock" } },
            priority: 1,
            cmd: () => {
              menu._toggleBlock(menu.schema.nodes.section, wrapIn, {
                attrs: { _preserve: { class: "statblock" } },
              });
              return true;
            },
          },
          {
            action: "pf2e-traits",
            class: "traits",
            title: "Trait",
            node: menu.schema.nodes.section,
            attrs: { _preserve: { class: "traits" } },
            priority: 1,
            cmd: () => {
              menu._toggleBlock(menu.schema.nodes.section, wrapIn, {
                attrs: { _preserve: { class: "traits" } },
              });
              return true;
            },
          },
          {
            action: "pf2e-written-note",
            class: "message",
            title: "Written Note",
            node: menu.schema.nodes.paragraph,
            attrs: { _preserve: { class: "message" } },
            priority: 1,
            cmd: () => {
              menu._toggleTextBlock(menu.schema.nodes.paragraph, {
                attrs: { _preserve: { class: "message" } },
              });
              return true;
            },
          },
          {
            action: "pf2e-gm-text-block",
            class: "visibility-gm",
            title: "GM Text Block",
            node: menu.schema.nodes.div,
            attrs: { _preserve: { "data-visibility": "gm" } },
            priority: 1,
            cmd: () => {
              menu._toggleBlock(menu.schema.nodes.div, wrapIn, {
                attrs: { _preserve: { "data-visibility": "gm" } },
              });
              return true;
            },
          },
          {
            action: "pf2e-gm-text-inline",
            class: "visibility-gm",
            title: "GM Text Inline",
            mark: menu.schema.marks.span,
            attrs: { _preserve: { "data-visibility": "gm" } },
            priority: 1,
            cmd: toggleMark(menu.schema.marks.span, {
              _preserve: { "data-visibility": "gm" },
            }),
          },
        ],
      });
    }
  });
});

Hooks.once("ready", async function () {});

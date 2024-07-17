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
            action: "maji-compartment",
            class: "maji-compartment",
            title: "Compartment",
            attrs: { _preserve: { class: "maji-compartment" } },
            priority: 0,
            cmd: () => {
              const html = `<section class="compartment">
              <article class="full">
                  <h2>Title</h2>
                  <p></p>
              </article>
          </section>
          `;
              const data = ProseMirror.dom.parseString(html, menu.schema);
              menu.view.dispatch(
                menu.view.state.tr.replaceSelectionWith(data).scrollIntoView()
              );
              return true;
            },
          },
          {
            action: "maji-test",
            class: "maji-test",
            title: "test",
            attrs: { _preserve: { class: "maji-test" } },
            priority: 0,
            cmd: () => {
              console.log({ menu: menu.view.state.selection.content() });
            },
          },
          {
            action: "maji-investigation",
            class: "maji-investigation",
            title: "Investigation Box Text",
            attrs: { _preserve: { class: "box-text investigation" } },
            priority: 0,
            cmd: () => {
              const html = `<section class="box-text investigation">
              <header>
                  <img src="icons/tools/scribal/magnifying-glass.webp" width="100">
                  <h2>Exploration</h2>
                  <p>@Compendium[pf2e.actionspf2e.TiNDYUGlMmxzxBYU]{Search} @UUID[Compendium.pf2e.actionspf2e.Item.EwgTZBWsc8qKaViP]{Investigate}</p>
              </header>
              <article>
                  <p></p>
              </article>
          </section>
          `;
              const data = ProseMirror.dom.parseString(html, menu.schema);
              menu.view.dispatch(
                menu.view.state.tr.replaceSelectionWith(data).scrollIntoView()
              );
              return true;
            },
          },
          {
            action: "maji-encounter",
            class: "maji-encounter",
            title: "Encounter Box Text",
            attrs: { _preserve: { class: "box-text encounter" } },
            priority: 0,
            cmd: () => {
              const html = `<section class="box-text encounter">
              <header>
                  <img src="icons/commodities/bones/skull-hollow-white.webp" width="100">
                  <section>
                      <h2>Encounter</h2>
                      <h2>Low 3</h2>
                  </section>
                  <section>
                      <div>
                          <p>@UUID[Compendium.pf2e.pathfinder-bestiary.Actor.r9w1n85mp9Ip4QiS]{Kobold Warrior}</p>
                      </div>
                      <p>60 XP</p>
                  </section>
              </header>
              <article>
                  <p></p>
              </article>
          </section>`;
              const data = ProseMirror.dom.parseString(html, menu.schema);
              menu.view.dispatch(
                menu.view.state.tr.replaceSelectionWith(data).scrollIntoView()
              );
              return true;
            },
          },
          {
            action: "maji-treasure-box",
            class: "maji-treasure-box",
            title: "Treasure Box Text",
            attrs: { _preserve: { class: "maji-treasure-box" } },
            priority: 0,
            cmd: () => {
              const html = `<section class="box-text treasure">
              <header>
                  <img src="icons/containers/chest/chest-elm-steel-brown.webp" width="100">
                  <h2>Treasure</h2>
                  <p>@UUID[Compendium.pf2e.equipment-srd.Item.B6B7tBWJSqOBz5zz]{Gold Pieces  (20)}</p>
              </header>
              <article>
                  <p></p>
              </article>
          </section>`;
              const data = ProseMirror.dom.parseString(html, menu.schema);
              menu.view.dispatch(
                menu.view.state.tr.replaceSelectionWith(data).scrollIntoView()
              );
              return true;
            },
          },
          {
            action: "maji-treasure-box",
            class: "maji-treasure-box",
            title: "Treasure Box Text",
            attrs: { _preserve: { class: "maji-treasure-box" } },
            priority: 0,
            cmd: () => {
              const html = `<section class="box-text treasure">
              <header>
                  <img src="icons/containers/chest/chest-elm-steel-brown.webp" width="100">
                  <h2>Treasure</h2>
                  <p>@UUID[Compendium.pf2e.equipment-srd.Item.B6B7tBWJSqOBz5zz]{Gold Pieces  (20)}</p>
              </header>
              <article>
                  <p></p>
              </article>
          </section>`;
              const data = ProseMirror.dom.parseString(html, menu.schema);
              menu.view.dispatch(
                menu.view.state.tr.replaceSelectionWith(data).scrollIntoView()
              );
              return true;
            },
          },
          {
            action: "maji-macro-box",
            class: "maji-macro-box",
            title: "Macro Box Text",
            attrs: { _preserve: { class: "box-text fvtt" } },
            priority: 0,
            cmd: () => {
              const html = `<section class="box-text fvtt">
              <header>
                  <img src="icons/vtt-512.png" width="100">
                  <h2>Macro</h2>
                  <p>@UUID[Compendium.pf2e.pf2e-macros.Macro.mxHKWibjPrgfJTDg]{Earn Income}</p>
              </header>
              <article>
                  <p></p>
              </article>
          </section>`;
              const data = ProseMirror.dom.parseString(html, menu.schema);
              menu.view.dispatch(
                menu.view.state.tr.replaceSelectionWith(data).scrollIntoView()
              );
              return true;
            },
          },
          {
            action: "maji-float-box",
            class: "maji-float-box",
            title: "Float Box",
            attrs: { _preserve: { class: "maji-float-box" } },
            priority: 0,
            cmd: () => {
              const html = `<aside class="maji-float-block">
              <h3>Title</h3>
              <p>Text</p>
          </aside>`;
              const data = ProseMirror.dom.parseString(html, menu.schema);
              menu.view.dispatch(
                menu.view.state.tr.replaceSelectionWith(data).scrollIntoView()
              );
              return true;
            },
          },
          {
            action: "maji-figure-right",
            class: "maji-figure-right",
            title: "Figure Right",
            attrs: { _preserve: { class: "maji-figure-right" } },
            priority: 0,
            cmd: () => {
              const html = `<figure class="right">
              <img src="icons/equipment/wrist/bracer-banded-leather-pink-gold.webp" width="200">
              <figcaption>@UUID[Compendium.pf2e.equipment-srd.Item.BKdzb8hu3kZtKH3Z]{Bracelet of Dashing}</figcaption>
   </figure>`;
              const data = ProseMirror.dom.parseString(html, menu.schema);
              menu.view.dispatch(
                menu.view.state.tr.replaceSelectionWith(data).scrollIntoView()
              );
              return true;
            },
          },
        ],
      });
    }
  });
});

Hooks.once("ready", async function () {});

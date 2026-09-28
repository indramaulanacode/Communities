# Chatcommunity — Community Management Web App UI

A dark-themed community management SPA built with React + Vite + Tailwind CSS, implemented from the "Community Managment Web App Ui Kit Ui8" Figma designs. All data is in-memory (no backend); every page is fully interactive.

## Requirements

- Node.js 18+ (20+ recommended)
- npm

## Getting Started

```bash
npm install     # install dependencies
npm run dev     # start dev server → http://localhost:5173
```

Other scripts:

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Using the App

The sidebar on the left switches between pages. Every list, card, and button is clickable — most items show an in-place active/highlight state when selected.

### Dashboard

Overview grid of community cards (Tech Arsenal, Community, Calendar, Task, profile, showcases, Job Desk, collections) plus logo strip and footer.

- Tech Arsenal tiles open their page (Community / Chats / Task); People tile just highlights
- Calendar chevrons change month; clicking a day selects it
- Star, chips, rows, tiles, buttons, logos, and footer links all toggle an active state on click
- Community card arrows jump to the Community page

### Community

- Left list: click a "Your Community" card to open the active rail + entries view (rail ring `#F4405E`, entry highlight `#3871EE`); the **Back** button returns to the default list
- Right: chat thread panel (see Chats)

### Chats

- **Personal Chats** list: type in the search field to filter live; the Search button scrolls the list to top
- Click a chat card to highlight it and open it in the conversation panel on the right (header shows the selected chat); click again to deselect
- Star icon on each card toggles; kebab menu offers **Clear Search**, **Starred Only**, **Unstar All**
- **Load More** appends more chats (up to 28, then disables)
- Conversation panel: the paperclip button opens the centered "Drag And Drop File" popup; click the backdrop to close

### People

- Middle column: community search filters channels + online list; channels and online rows are selectable; "+" adds a channel; "Back to active conversation" jumps to Chats
- Right panel: About / Members / Files tabs; member search and the **All roles** dropdown filter the list; **Invite members** adds a member; rows highlight on click and their chat/kebab buttons toggle; **Load more** appends members

### Task

- **Task Groups** column: "+" opens the Add-Your-task modal
- **Your Task** column: scrollable list; the small square on each row is a radio (single select, blue when active); "Create New Task" opens the modal and prepends a new item; "Select All" row and search pill are part of the header toolbar
- **Status On Progress** detail column with calendar and collaborators
- Add-Your-task modal: fill task + note, then **Save** or **Upload** to add the item; X closes

## Project Structure

```
src/
  App.jsx                    # page routing (useState switch) + sidebar layout
  main.jsx                   # entry point
  index.css                  # Tailwind v4 import
  components/
    Sidebar.jsx              # left navigation (Dashboard/Community/Chats/People/Task)
    Dashboard.jsx            # dashboard cards grid
    CommunityPage.jsx        # community list + chat panel
    CommunityListSection.jsx # default ↔ active community list toggle
    ChatsPage.jsx            # personal chats list + chat panel
    PersonalChatsList.jsx    # searchable, starable chat list
    ChatPanel.jsx            # conversation thread + file drop popup
    PeoplePage.jsx           # community workspace + members panel
    TaskPage.jsx             # task groups, your task list, detail, add-task modal
```

## Tech Stack

- React 19, Vite 7
- Tailwind CSS v4 (`@tailwindcss/vite`)
- lucide-react icons

## Notes

- State lives in React only — refreshing the page resets all changes
- Design palette: page `#0a0a0a`, panels `#121212`/`#161616`, cards `#191919`, blue `#2e7cf6`, purple `#7c4dff`, pink `#f4436c`, rail ring `#F4405E`, list entry `#3871EE`

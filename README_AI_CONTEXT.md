# Schippy AI Assistant Prototype - Developer & AI Context

## 1. Overview
Schippy is an in-product, guided AI assistant inside the SCHIP platform. The prototype has evolved from a single hardcoded script into a scalable JSON-based state machine (`SCHIPPY_ENGINE`). 

It currently supports 5 core conversational flows:
1. **Move Batch** (Legacy if/else branching)
2. **Summary: Single Material** (Engine-driven)
3. **Summary: Multi-Material** (Engine-driven)
4. **Comparison** (Engine-driven)
5. **Material Detail Drill-down** (Engine-driven)

## 2. Core Architecture: `SCHIPPY_ENGINE`
The application is built using a **Finite State Machine (FSM)** structured inside `SCHIPPY_ENGINE.flows`. The conversation is strictly controlled by states (e.g., `awaiting_followup` -> `showing_top_materials_table`).

This means:
- **`processInput()` is lean:** It primarily acts as a global interceptor. It catches strict commands (like `"VIEW_MATERIAL_DETAIL|..."`), extracts initial contexts (NLP mocks), and hands off control to the engine.
- **`session.context` is the Source of Truth:** Data passes between states and flows via `session.context`. 
- **Context Preservation (Stack Push/Pop):** Drill-down flows like `material_detail` capture the parent state (`session.context.drilldown`) and can cleanly pop back to exactly where the user left off.

## 3. The 5 Core Flows
*   **move_batch:** The original legacy flow. Operates via an `if/else` block inside `processInput()`. 
*   **summary_single_material:** Triggered when the user asks about a specific material to a destination (e.g., "Gatorade to Carlisle").
*   **summary_multi_material:** Triggered for general destination queries (e.g., "Summarize Carlisle"). Displays top materials tables.
*   **comparison:** Can be launched from either summary flow or from the drill-down card. It sets a base destination and asks for a comparison target (e.g., Joliet vs Dallas).
*   **material_detail:** A strict drill-down flow triggered only by clicking a material row in a top-materials table. Shows origin-level breakdown for that specific material.

## 4. Current Mocked Data Limitations
To maintain speed and agility in this design prototype, data is heavily mocked:
*   **`getMockComparisonSummary` / `getTopMaterialsData` / `getMockMaterialDrilldownData`:** These helper functions generate static or pseudo-dynamic data based on the user's input.
*   **Legacy Bridges (`lastSummary`, `lastTopN`):** Because the mock comparison data generator (`getMockComparisonSummary`) relies on the shape of the old summary objects to calculate deltas, `session.lastSummary` and `session.lastTopN` are still explicitly saved as transitional bridges. Do not delete them until a real backend replaces the mock generators.
*   **No Backend Execution:** Everything runs client-side. No real APIs are called.

## 5. Remaining Technical Debt (Transitional vs Finalized)
*   **Finalized:** `summary_single_material`, `summary_multi_material`, `comparison`, and `material_detail` are fully engine-driven. `session.flowContext` and `session.currentSummary` have been completely removed.
*   **Transitional (Do not break):** `session.lastSummary` and `session.lastTopN` remain explicitly to support the mock data generators. 
*   **Transitional:** `move_batch` remains as a monolithic `if/else` block in `processInput()`. Migrating it to the engine is postponed to avoid disrupting its stability.

## 6. How to Add New Flows Going Forward
1. Define the new flow inside `SCHIPPY_ENGINE.flows` with its states.
2. Ensure each state defines `botMessage`, `renderComponent`, `quickReplies`, and an `onInput(text, ctx)` handler.
3. If it is a top-level intent, add a lightweight detection branch at the top of `processInput()` (inside the Interceptor block) to set `session.flow`, populate initial `session.context`, and call `executeFlowStep`.
4. If it is a drill-down, save the `parentFlow`, `parentState`, and `parentContextSnapshot` so the user can reliably use a "Back" quick reply.
# Shippy AI Assistant Prototype - Developer & AI Context

## 1. Overview
Shippy is an in-product, guided AI assistant inside the SCHIP platform. This prototype currently focuses on a single flow: **Move Batch**.

## 2. Core Architecture: State-Driven Guided Flow
This prototype is built using a **Finite State Machine (FSM)**. It is *not* a generic, keyword-driven chatbot. The conversation is strictly controlled by states (e.g., `awaiting_batch_reference` -> `awaiting_change_scope` -> `analyzing_proposal`).

This means:
- User input is interpreted based on the *current state*.
- The UI and system behavior are deterministic based on the active flow.
- It prevents the AI from hallucinating transitions or getting lost in free-form conversation.

## 3. Current Prototype Simplifications
To maintain speed and agility in this design prototype, several simplifications are currently active:
*   **Batch Identification is Mocked:** Regardless of what the user inputs when asked for a batch, the system auto-fills a mocked batch (Gatorade from plant 3389 to 3442).
*   **Analysis Results are Mocked:** Complex backend routing logic is bypassed. Instead, the prototype uses a helper function (`getMockProposalByScope`) to generate realistic-looking impact analysis data based on the user's choice (Origin, Destination, or Both).
*   **Input Validation is Simplified:** Basic length checks (e.g., input must be > 3 chars) exist, but it does not validate against real master data.
*   **UI Mutations are Simulated Locally:** When changes are "Applied," the row highlighting (purple background, checkbox selection) is handled purely via DOM manipulation in JS (`app.js`), without updating an actual database.
*   **No Backend Execution:** Everything runs client-side. No real APIs are called.

## 4. Pending Edge Cases / Future Robustness
For a production-ready version, the following logic must be implemented:
*   **Real Data Fetching:** Connecting to the STO backend to pull actual batch details.
*   **Disambiguation:** Handling scenarios where a user's input returns multiple matches (e.g., multiple batches at one location).
*   **Error Handling:** Managing API timeouts, locked batches, or permissions errors during the analysis or apply phases.
*   **Dynamic UI Syncing:** Integrating the Copilot's "Apply" action with the frontend framework's state management (e.g., React/Redux) to update the main table seamlessly, rather than hacking the DOM.

## 5. Guardrails
The prototype adheres to the following strict guardrails:
*   **Do not auto-restart the flow:** If an error occurs or the user cancels, the flow stops and waits for user instruction.
*   **Do not advance on clearly invalid input:** Empty inputs or inputs under 3 characters during location prompts will trigger a retry message.
*   **Do not mutate the main table unless apply is confirmed:** The visual row highlight only happens *after* the `awaiting_apply_decision` state reaches "Yes".
*   **Do not confuse assistant bubbles with action chips:** Assistant bubbles are strictly for conversational text and structured HTML results. Actions should be represented by standard UI inputs or quick-reply chips.
*   **Global Reset & Cancel:** 
    *   Typing "cancel" mid-flow stops the current operation, confirms no changes were made, and stays in the chat.
    *   Typing "back", "start over", or "restart" mid-flow completely resets the conversation, clears the chat history, and returns the user to the initial welcome screen prompt. It does *not* go back one single step.
document.addEventListener("DOMContentLoaded", () => {
    
    // --- UI ELEMENTS ---
    const fabButton = document.getElementById('fab-copilot');
    const closeButton = document.getElementById('close-copilot');
    const copilotPanel = document.getElementById('copilot-panel');
    const panelOverlay = document.getElementById('panel-overlay');
    const tableBody = document.getElementById('table-body');
    const chatBox = document.getElementById("chat-box");
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");

    // --- POPULATE TABLE DATA ---
    const tableData = [
        { plant: '2014', plantName: 'QUAKER DC LOCKBOURNE OH', material: '10034895248939888', name: 'Gatorade Thirst Quencher Powder Fruit Punch 2.5 gal', batch: '071124GP', stcLoc: '00' },
        { plant: '2014', plantName: 'QUAKER DC LOCKBOURNE OH', material: '10052000', name: 'Gatorade Thirst Quencher Powder Lemon-lime 2.5 gal', batch: '061024GP', stcLoc: '00' },
        { plant: '2033', plantName: 'QUAKER RP ECOMM GRAND PRAIRIE', material: '10052000', name: 'Gatorade Thirst Quencher Powder Lemon-lime 2.5 gal', batch: '061324GP', stcLoc: '00' },
        { plant: '2071', plantName: 'QUAKER DC LAKELAND FL', material: '10052000', name: 'Gatorade Thirst Quencher Powder Lemon-lime 2.5 gal', batch: '061024GP', stcLoc: '00' }
    ];

    function renderTable() {
        tableBody.innerHTML = '';
        tableData.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-neutral-100 transition-colors border-b border-neutral-200 last:border-b-0 text-sm leading-6';
            
            const actionSelect = index === 0 
                ? `<select class="border border-neutral-300 rounded-base px-2 py-1 text-neutral-700 bg-white w-full text-[13px] font-sans focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-100 shadow-sm appearance-none" style="background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 6px center; background-size: 14px;"><option>Unassigned</option><option>Text Value</option></select>`
                : `<select class="border border-neutral-300 rounded-base px-2 py-1 text-neutral-700 bg-white w-full text-[13px] font-sans focus:outline-none focus:border-primary-500 shadow-sm appearance-none"><option>Unassigned</option></select>`;

            tr.innerHTML = `
                <td class="px-base py-sm w-10 text-center border-r border-neutral-200 align-top"><input type="checkbox" class="rounded-base border-neutral-300 mt-1"></td>
                <td class="px-base py-sm border-r border-neutral-200 text-neutral-900 font-mono tracking-tight align-top">${row.plant}</td>
                <td class="px-base py-sm border-r border-neutral-200 max-w-[200px] truncate text-neutral-700 font-sans align-top" title="${row.plantName}">${row.plantName}</td>
                <td class="px-base py-sm border-r border-neutral-200 text-neutral-900 font-mono tracking-tight align-top">${row.material}</td>
                <td class="px-base py-sm border-r border-neutral-200 max-w-[250px] truncate text-neutral-700 font-sans align-top" title="${row.name}">${row.name}</td>
                <td class="px-base py-sm border-r border-neutral-200 text-neutral-900 font-mono tracking-tight align-top">${row.batch}</td>
                <td class="px-base py-sm border-r border-neutral-200 text-neutral-900 font-mono tracking-tight align-top text-center">${row.stcLoc}</td>
                <td class="px-base py-sm border-r border-neutral-200 align-top">${actionSelect}</td>
                <td class="px-base py-sm border-r border-neutral-200 align-top">
                    <select class="border border-neutral-200 rounded-base px-2 py-1 text-neutral-400 bg-neutral-50 w-full text-[13px] font-sans focus:outline-none cursor-not-allowed appearance-none" disabled>
                        <option>--</option>
                    </select>
                </td>
                <td class="px-base py-sm border-r border-neutral-200 flex items-center justify-between align-top">
                    <select class="border border-neutral-200 rounded-base px-2 py-1 text-neutral-400 bg-neutral-50 w-[70%] text-[13px] font-sans focus:outline-none cursor-not-allowed appearance-none" disabled>
                        <option>--</option>
                    </select>
                    <i data-lucide="check" class="w-4 h-4 text-neutral-400"></i>
                </td>
            `;
            tableBody.appendChild(tr);
        });
        if(window.lucide) lucide.createIcons();
    }
    renderTable();

    // --- PANEL TOGGLE LOGIC ---
    const mainContent = document.getElementById('main-content');

    function openPanel() {
        copilotPanel.classList.remove('translate-x-full');
        panelOverlay.classList.remove('hidden');
        setTimeout(() => { panelOverlay.classList.remove('opacity-0'); }, 10);
        // Push content on desktop
        mainContent.style.paddingRight = window.innerWidth >= 640 ? '450px' : '0px';
    }
    function closePanel() {
        copilotPanel.classList.add('translate-x-full');
        // Revert push on desktop
        mainContent.style.paddingRight = '0px';
        panelOverlay.classList.add('opacity-0');
        setTimeout(() => { panelOverlay.classList.add('hidden'); }, 300);
    }

    fabButton.addEventListener('click', openPanel);
    closeButton.addEventListener('click', closePanel);
    panelOverlay.addEventListener('click', closePanel);

    // --- COPILOT CHAT LOGIC & STATE MACHINE ---
    const session = {
        flow: null,
        state: 'idle',
        identifiedBatch: null,
        changeScope: null, // 'origin', 'destination', 'both'
        newOrigin: null,
        newDestination: null,
        currentProposal: null
    };

    function resetSession() {
        session.flow = null;
        session.state = 'idle';
        session.identifiedBatch = null;
        session.changeScope = null;
        session.newOrigin = null;
        session.newDestination = null;
        session.currentProposal = null;
    }

    function renderWelcomeScreen() {
        chatBox.innerHTML = `
            <div id="welcome-screen" class="flex flex-col items-center justify-center pt-8 pb-4 w-full animate-fade-in-up">
                <div class="relative w-24 h-24 mb-6">
                    <div class="absolute bg-copilot-brand rounded-full w-20 h-20 top-4 left-4"></div>
                    <img src="schippy.png" alt="Schippy" class="relative z-10 w-24 h-24 object-contain drop-shadow-md" onerror="this.src='https://cdn-icons-png.flaticon.com/512/2565/2565174.png'">
                </div>
                <h3 class="text-center text-[22px] font-bold text-neutral-900 leading-[1.3] mb-6 tracking-tight font-sans">Hi Mariana,<br>Welcome back! How Can I help?</h3>
                <div class="flex gap-3">
                    <button onclick="window.startMoveBatch()" class="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-neutral-300">Move a batch</button>
                    <button onclick="window.sendQuickReply('Give me the summary')" class="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-neutral-300">Give me the summary</button>
                </div>
            </div>
        `;
    }

    function renderMoveBatchHeader() {
        const header = document.createElement('div');
        header.className = "flex flex-col items-center justify-center pt-2 pb-0 w-full animate-fade-in-up";
        header.innerHTML = `
            <div class="relative w-[80px] h-[80px] mb-3">
                <div class="absolute bg-copilot-brand rounded-full w-14 h-14 top-3 left-3"></div>
                <img src="schippy.png" alt="Schippy" class="relative z-10 w-[80px] h-[80px] object-contain drop-shadow-md" onerror="this.src='https://cdn-icons-png.flaticon.com/512/2565/2565174.png'">
            </div>
            <h3 class="text-center text-[18px] font-bold text-neutral-900 leading-snug tracking-tight font-sans mb-4">Let's move a batch!</h3>
        `;
        chatBox.appendChild(header);
    }

    window.startMoveBatch = function() {
        const welcomeScreen = document.getElementById("welcome-screen");
        if (welcomeScreen) welcomeScreen.remove();
        
        session.flow = 'move_batch';
        session.state = 'awaiting_batch_reference';
        
        // Remove typing indicator if any
        hideTypingIndicator();
        
        appendMessage("Hi Mariana, let's move a batch. Which route would you like to move? You can provide a material ID, batch ID, or store location.", "bot");
    }

    renderWelcomeScreen();

    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;
        
        appendMessage(text, 'user');
        processInput(text);
        userInput.value = "";
    });

    window.sendQuickReply = function(text) {
        document.querySelectorAll('.quick-reply-btn').forEach(btn => btn.remove());
        // Populate input and fake a slight typing delay before submission
        userInput.value = text;
        userInput.focus();
        setTimeout(() => {
            document.getElementById("chat-form").dispatchEvent(new Event('submit', { cancelable: true }));
        }, 300);
    }

    function processInput(text) {
        const lowerText = text.toLowerCase();
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            
            // Global Prototype Guardrails: Cancel vs Restart
            if (session.state !== 'idle') {
                if (lowerText === 'cancel') {
                    appendMessage("Operation cancelled. No changes were made to your data. What would you like to do next?", 'bot');
                    resetSession();
                    scrollToBottom();
                    return;
                } else if (['start over', 'restart', 'back'].includes(lowerText)) {
                    resetSession();
                    renderWelcomeScreen(); // Wipes chat history and shows the initial welcome screen
                    return;
                }
            }

            if (session.state === "idle") {
                const welcomeScreen = document.getElementById("welcome-screen");
                if (welcomeScreen) welcomeScreen.remove();

                if (lowerText.includes('move') || lowerText.includes('batch')) {
                    session.flow = 'move_batch';
                    session.state = 'awaiting_batch_reference';
                    appendMessage("Hi Mariana, let's move a batch. Which route would you like to move? You can provide a material ID, batch ID, or store location.", "bot");
                } else if (lowerText.includes('summary') || lowerText.includes('report')) {
                    session.flow = 'summary_query';
                    session.state = 'awaiting_summary_query';
                    appendMessage("What would you like to understand? You can ask about routes, totals, or specific locations.", "bot");
                    prefillInput("Total weight by origin");
                } else {
                    appendMessage("I am Schippy, your AI assistant for logistics and STO management. I can help you move batches, analyze route impacts, and consolidate trucks.", "bot");
                }
            
            } else if (session.state === "awaiting_batch_reference") {
                // Any input is accepted for prototype
                session.identifiedBatch = {
                    materialId: "010052000052814000",
                    batchId: "071124GP",
                    origin: "3389 (Beverage Indianapolis SVC CTR)",
                    destination: "3442 (PCNA Carlisle Service Center)",
                    weight: "81,700 lbs"
                };
                session.state = "awaiting_batch_confirmation";
                appendMessage(`I found the batch. Let me confirm the details:<br><strong>Batch Gatorade moving : 3389 ➔ 3442</strong><br>Material ID: <strong>${session.identifiedBatch.materialId}</strong><br>Batch: <strong>${session.identifiedBatch.batchId}</strong><br>Origin Plant: <strong>${session.identifiedBatch.origin}</strong><br>Current Destination: <strong>${session.identifiedBatch.destination}</strong><br>Weight: <strong>${session.identifiedBatch.weight}</strong><br>Is that correct?`, 'bot');
                prefillInput("Yes");

            } else if (session.state === "awaiting_batch_confirmation") {
                if (lowerText.includes('yes')) {
                    session.state = "awaiting_change_scope";
                    appendMessage("Great. What would you like to change? (origin, destination, or both)", 'bot');
                    prefillInput("Both");
                } else if (lowerText.includes('no')) {
                    session.state = "awaiting_batch_reference";
                    appendMessage("Okay, let's try again. Please provide a material ID, batch ID, or store location.", 'bot');
                } else {
                    appendMessage("Please answer Yes or No to confirm the batch details.", 'bot');
                    prefillInput("Yes");
                }
            
            } else if (session.state === "awaiting_change_scope") {
                if (lowerText.includes('origin') && !lowerText.includes('both')) {
                    session.changeScope = 'origin';
                    session.state = "awaiting_new_origin";
                    appendMessage("What is the new origin?", 'bot');
                    prefillInput("4040 — Gatorade DC Lakeland SVC CTR (FL)");
                } else if (lowerText.includes('destination') && !lowerText.includes('both')) {
                    session.changeScope = 'destination';
                    session.state = "awaiting_new_destination";
                    appendMessage("What is the new destination?", 'bot');
                    prefillInput("3944 — Quaker DC Lancaster TX");
                } else if (lowerText.includes('both')) {
                    session.changeScope = 'both';
                    session.state = "awaiting_new_origin_and_destination";
                    appendMessage("What is the new origin?", 'bot');
                    prefillInput("4040 — Gatorade DC Lakeland SVC CTR (FL)");
                } else {
                    appendMessage("Please specify if you want to change the origin, destination, or both.", 'bot');
                    prefillInput("Both");
                }
            
            } else if (session.state === "awaiting_new_origin") {
                if (text.length < 3) {
                    appendMessage("Please provide a valid origin location code or name.", 'bot');
                    return;
                }
                session.newOrigin = text;
                session.state = "analyzing_proposal";
                triggerAnalysis();
            
            } else if (session.state === "awaiting_new_destination") {
                if (text.length < 3) {
                    appendMessage("Please provide a valid destination location code or name.", 'bot');
                    return;
                }
                session.newDestination = text;
                session.state = "analyzing_proposal";
                triggerAnalysis();
            
            } else if (session.state === "awaiting_new_origin_and_destination") {
                if (text.length < 3) {
                    appendMessage("Please provide a valid location code or name.", 'bot');
                    return;
                }
                if (!session.newOrigin) {
                    session.newOrigin = text;
                    appendMessage("What is the new destination?", 'bot');
                    prefillInput("3944 — Quaker DC Lancaster TX");
                } else {
                    session.newDestination = text;
                    session.state = "analyzing_proposal";
                    triggerAnalysis();
                }

            } else if (session.state === "awaiting_apply_decision") {
                if (lowerText.includes('yes') || lowerText.includes('make') || lowerText.includes('apply')) {
                    session.state = "applying_changes";
                    appendMessage("Perfect. I'm updating the batch movement now.", 'bot');
                    
                    setTimeout(() => {
                        renderSummaryAndApply();
                        session.state = "awaiting_final_acknowledgement";
                    }, 2000);
                } else if (lowerText.includes('no') || lowerText.includes('don') || lowerText.includes('cancel')) {
                    session.state = "cancelled_no_change";
                    appendMessage(`No problem. I'll leave the batch routing unchanged. Your original data remains unchanged.`, 'bot');
                } else {
                    appendMessage("Would you like to proceed with this change?", 'bot');
                    prefillInput("Yes");
                }

            } else if (session.state === "awaiting_final_acknowledgement") {
                appendMessage("You're all set. The updated routing is active and tracking normally.", 'bot');
                session.state = "completed";

            } else if (session.state === "completed" || session.state === "cancelled_no_change") {
                appendMessage("The previous flow is complete. I can help you move another batch or give you a summary.", 'bot');
                resetSession();
                
            } else if (session.state === "awaiting_summary_query" || session.state === "awaiting_followup") {
                // Short loading state to simulate classification & resolution
                const loadingDiv = document.createElement("div");
                loadingDiv.className = "flex items-start gap-3 w-full animate-fade-in-up font-sans mt-2";
                loadingDiv.innerHTML = `
                    <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 overflow-hidden bg-neutral-100 border border-neutral-200">
                        <img src="schippy.png" alt="Schippy" class="w-full h-full object-contain" onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/2565/2565174.png'">
                    </div>
                    <div class="text-[13px] text-neutral-900 w-full leading-[1.6] pt-[3px] font-sans">
                        <span class="text-copilot-brand flex items-center gap-2"><i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Querying route data...</span>
                    </div>
                `;
                chatBox.appendChild(loadingDiv);
                if (window.lucide) window.lucide.createIcons();
                scrollToBottom();
                
                setTimeout(() => {
                    loadingDiv.remove(); // Remove loading state
                    const summaryData = getMockSummary(lowerText);
                    renderSummaryCard(summaryData);
                    session.state = 'awaiting_followup';
                }, 800);
            }
            
            scrollToBottom();
        }, 1000);
    }

    function getMockProposalByScope(scope, batch, newO, newD) {
        let proposal = {
            proposedRouteText: "",
            recommendation: "",
            impactNote: "",
            netBenefit: "+ $360",
            costProposed: "$3,050",
            costImpact: "$150 (~5%)"
        };

        const shortOrig = batch.origin.split(' ')[0];
        const shortDest = batch.destination.split(' ')[0];

        if (scope === 'origin') {
            const shortNewO = newO.split(' ')[0];
            proposal.proposedRouteText = `${shortNewO} → ${shortDest}`;
            proposal.currentRouteHeader = "Current origin:<br><span class='font-normal text-neutral-600'>" + batch.origin + "</span>";
            proposal.proposedRouteHeader = "Proposed origin:<br><span class='font-normal text-neutral-600'>" + newO + "</span>";
            proposal.recommendation = "Apply the new origin configuration — it reduces source-side handling pressure and lowers cost while keeping cases stable.";
            proposal.impactNote = "Destination unchanged. Recommended due to better origin availability.";
            proposal.netBenefit = "+ $360";
        } else if (scope === 'destination') {
            const shortNewD = newD.split(' ')[0];
            proposal.proposedRouteText = `${shortOrig} → ${shortNewD}`;
            proposal.currentRouteHeader = "Current destination:<br><span class='font-normal text-neutral-600'>" + batch.destination + "</span>";
            proposal.proposedRouteHeader = "Proposed destination:<br><span class='font-normal text-neutral-600'>" + newD + "</span>";
            proposal.recommendation = "Apply the rerouting — it improves destination alignment and lowers transportation cost.";
            proposal.impactNote = "Origin unchanged. Recommended due to better downstream fit.";
            proposal.netBenefit = "+ $280";
            proposal.costProposed = "$2,920";
            proposal.costImpact = "$280 (~8%)";
        } else {
            const shortNewO = newO.split(' ')[0];
            const shortNewD = newD.split(' ')[0];
            proposal.proposedRouteText = `${shortNewO} → ${shortNewD}`;
            proposal.currentRouteHeader = "Current route:<br><span class='font-normal text-neutral-600'>" + batch.origin + " → " + batch.destination + "</span>";
            proposal.proposedRouteHeader = "Proposed route:<br><span class='font-normal text-neutral-600'>" + newO + " → " + newD + "</span>";
            proposal.recommendation = "Apply the full route adjustment — it rebalances the full batch movement path.";
            proposal.impactNote = "Origin and destination updated. Recommended when both ends need adjustment.";
            proposal.netBenefit = "+ $510";
            proposal.costProposed = "$2,690";
            proposal.costImpact = "$510 (~15%)";
        }
        return proposal;
    }

    function getMockSummary(query) {
        const q = query.toLowerCase();
        let summary = {
            title: "Overall Route Summary",
            mainValue: "356 Active Routes",
            breakdown: [
                { label: "2014 - Quaker Lockbourne", value: "120 routes" },
                { label: "2033 - Quaker Grand Prairie", value: "95 routes" },
                { label: "2071 - Quaker Lakeland", value: "80 routes" }
            ],
            context: "Data spans 15 visited locations."
        };

        if (q.includes("weight") || q.includes("heavy") || q.includes("lbs")) {
            summary.title = "Total Weight by Origin";
            summary.mainValue = "1.2M lbs Pending";
            summary.breakdown = [
                { label: "3389 - Beverage Indianapolis", value: "450k lbs" },
                { label: "4040 - Gatorade Lakeland", value: "320k lbs" },
                { label: "2014 - Quaker Lockbourne", value: "280k lbs" }
            ];
            summary.context = "Weight aggregation across all unassigned STOs.";
        } else if (q.includes("destination") || q.includes("to")) {
            summary.title = "Top Destinations by Volume";
            summary.mainValue = "50 STOs Unassigned";
            summary.breakdown = [
                { label: "3442 - PCNA Carlisle", value: "22 STOs" },
                { label: "3944 - Quaker Lancaster", value: "15 STOs" },
                { label: "Other Destinations", value: "13 STOs" }
            ];
            summary.context = "Focusing on locations needing immediate routing.";
        } else if (q.includes("origin") || q.includes("from")) {
            summary.title = "Top Origins by Volume";
            summary.mainValue = "74 Total Scenarios";
            summary.breakdown = [
                { label: "2014 - Quaker Lockbourne", value: "30 Scenarios" },
                { label: "2033 - Quaker Grand Prairie", value: "24 Scenarios" },
                { label: "2071 - Quaker Lakeland", value: "20 Scenarios" }
            ];
            summary.context = "Origin-side scenario distribution.";
        }

        return summary;
    }

    function renderSummaryCard(summary) {
        const div = document.createElement('div');
        div.className = "flex items-start gap-3 w-full animate-fade-in-up font-sans mt-2 mb-4";
        
        let breakdownHTML = summary.breakdown.map(item => `
            <div class="flex justify-between items-center text-[13px] py-1.5 border-b border-neutral-100 last:border-0">
                <span class="text-neutral-600 truncate pr-2">${item.label}</span>
                <span class="font-medium text-neutral-900 shrink-0">${item.value}</span>
            </div>
        `).join('');

        div.innerHTML = `
            <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 overflow-hidden bg-neutral-100 border border-neutral-200">
                <img src="schippy.png" alt="Schippy" class="w-full h-full object-contain" onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/2565/2565174.png'">
            </div>
            <div class="w-full">
                <!-- Structured Summary Card -->
                <div class="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm mb-3 w-full">
                    <div class="flex items-center gap-2 mb-2">
                        <i data-lucide="bar-chart-2" class="w-4 h-4 text-copilot-brand"></i>
                        <h4 class="text-[12px] font-bold text-neutral-900 uppercase tracking-wider">${summary.title}</h4>
                    </div>
                    <div class="text-[28px] font-bold text-neutral-900 mb-3 tracking-tight leading-none">${summary.mainValue}</div>
                    
                    <div class="mb-3 border-t border-neutral-100 pt-2">
                        ${breakdownHTML}
                    </div>
                    <p class="text-[11px] text-neutral-500 flex items-center gap-1"><i data-lucide="info" class="w-3.5 h-3.5"></i> ${summary.context}</p>
                </div>
                
                <p class="text-[13px] text-neutral-900 mb-2">Would you like to explore this further?</p>
                <div class="flex flex-wrap gap-2">
                    <button onclick="window.sendQuickReply('Break it down by origin')" class="quick-reply-btn bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors shadow-sm">Break it down by origin</button>
                    <button onclick="window.sendQuickReply('Show destinations')" class="quick-reply-btn bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors shadow-sm">Show destinations</button>
                    <button onclick="window.sendQuickReply('Total weight')" class="quick-reply-btn bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors shadow-sm">Total weight</button>
                </div>
            </div>
        `;
        
        chatBox.appendChild(div);
        if(window.lucide) lucide.createIcons();
        scrollToBottom();
    }

    function triggerAnalysis() {
        appendMessage(`Got it. Let me run a comparative analysis between your current route and the proposed change...<br><br>
        <span class="text-copilot-brand flex items-center gap-2 mb-1"><i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Checking inventory & constraints...</span>
        <span class="text-copilot-brand flex items-center gap-2 mb-3"><i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Analyzing lane availability...</span>
        <strong>All good. Running route comparison...</strong>`, 'bot');
        
        setTimeout(() => {
            const proposal = getMockProposalByScope(session.changeScope, session.identifiedBatch, session.newOrigin, session.newDestination);
            session.currentProposal = proposal;
            renderComparisonTable(proposal);
            session.state = "awaiting_apply_decision";
        }, 2000);
    }

    function renderComparisonTable(proposal) {
        const div = document.createElement('div');
        div.className = "bg-white font-sans mt-2 mb-2 w-full animate-fade-in-up pr-2";
        div.innerHTML = `
            <div class="flex items-start gap-3 w-full font-sans mb-3">
                <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 overflow-hidden bg-neutral-100 border border-neutral-200">
                    <img src="schippy.png" alt="Schippy" class="w-full h-full object-contain" onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/2565/2565174.png'">
                </div>
                <div class="text-[13px] text-neutral-900 w-full leading-[1.6] pt-[3px] font-sans">
                    Here's your route comparison:
                </div>
            </div>

            <div class="pl-0 sm:pl-[40px] mt-2 sm:mt-0 overflow-x-auto pb-2 scrollbar-hide">
                <table class="w-full text-left text-[12px] border-collapse mb-4 min-w-[300px]">
                    <thead>
                        <tr class="border-b border-neutral-200">
                            <th class="py-2 font-bold text-neutral-900 w-[20%]">Category</th>
                            <th class="py-2 font-bold text-neutral-900 leading-tight">${proposal.currentRouteHeader}</th>
                            <th class="py-2 font-bold text-neutral-900 leading-tight">${proposal.proposedRouteHeader}</th>
                            <th class="py-2 font-bold text-neutral-900">Δ / Impact</th>
                        </tr>
                    </thead>
                    <tbody class="text-neutral-800">
                        <tr class="border-b border-neutral-100">
                            <td class="py-2 font-bold">Trucks</td><td class="py-2">1.5</td><td class="py-2">${proposal.trucksProposed || "1"}</td>
                            <td class="py-2 text-success-700 leading-tight"><div class="flex items-start gap-1"><i data-lucide="arrow-down" class="w-3 h-3 shrink-0 mt-0.5"></i> <span>Consolidation<br>(fewer trucks)</span></div></td>
                        </tr>
                        <tr class="border-b border-neutral-100">
                            <td class="py-2 font-bold">Pallets</td><td class="py-2">84</td><td class="py-2">64</td>
                            <td class="py-2 text-success-700 leading-tight"><div class="flex items-start gap-1"><i data-lucide="arrow-down" class="w-3 h-3 shrink-0 mt-0.5"></i> <span>20 pallets<br>(target met)</span></div></td>
                        </tr>
                        <tr class="border-b border-neutral-100">
                            <td class="py-2 font-bold">Cases</td><td class="py-2">249</td><td class="py-2">249</td>
                            <td class="py-2 text-neutral-500">No change</td>
                        </tr>
                        <tr class="border-b border-neutral-100">
                            <td class="py-2 font-bold">Weight</td><td class="py-2">81,700 lbs</td><td class="py-2">72,000 lbs</td>
                            <td class="py-2 text-success-700 leading-tight"><div class="flex items-center gap-1"><i data-lucide="arrow-down" class="w-3 h-3"></i> ~9,700 lbs</div></td>
                        </tr>
                        <tr class="border-b border-neutral-100">
                            <td class="py-2 font-bold">Transp. $</td><td class="py-2">$3,200</td><td class="py-2">${proposal.costProposed}</td>
                            <td class="py-2 text-success-700 leading-tight"><div class="flex items-center gap-1"><i data-lucide="arrow-down" class="w-3 h-3"></i> ${proposal.costImpact}</div></td>
                        </tr>
                        <tr class="border-b border-neutral-100">
                            <td class="py-2 font-bold">Mit. Val.</td><td class="py-2">$8,210</td><td class="py-2">$8,420</td>
                            <td class="py-2 text-error-500 leading-tight"><div class="flex items-center gap-1"><i data-lucide="arrow-up" class="w-3 h-3"></i> $210</div></td>
                        </tr>
                        <tr>
                            <td class="py-2 font-bold">Net $</td><td class="py-2">—</td><td class="py-2">—</td>
                            <td class="py-2 text-success-700 font-bold">${proposal.netBenefit}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="mb-4">
                    <p class="text-[13px] text-neutral-900 leading-snug"><strong>Recommendation:</strong> ${proposal.recommendation}</p>
                    <p class="text-[12px] text-neutral-600 mt-2 leading-snug flex items-start gap-1"><span class="text-warning-500 font-bold">⚠️</span> <span>Note: ${proposal.impactNote} This assumes standard 45k lbs per truck capacity.</span></p>
                </div>
                <p class="text-[13px] font-medium text-neutral-900 mb-2">Would you like to proceed with this change?</p>
                
                <!-- Feedback Icons -->
                <div class="flex justify-end gap-3 text-neutral-400">
                    <i data-lucide="copy" class="w-4 h-4 cursor-pointer hover:text-neutral-700"></i>
                    <i data-lucide="thumbs-up" class="w-4 h-4 cursor-pointer hover:text-neutral-700"></i>
                    <i data-lucide="thumbs-down" class="w-4 h-4 cursor-pointer hover:text-neutral-700"></i>
                    <i data-lucide="rotate-ccw" class="w-4 h-4 cursor-pointer hover:text-neutral-700"></i>
                </div>
            </div>
        `;
        chatBox.appendChild(div);
        if(window.lucide) lucide.createIcons();
        prefillInput("Yes");
        scrollToBottom();
    }

    function renderSummaryAndApply() {
        // Remove typing indicator if present
        hideTypingIndicator();
        
        const proposal = session.currentProposal;
        
        // Render bot message with summary
        const div = document.createElement('div');
        div.className = "flex items-start gap-3 w-full animate-fade-in-up font-sans mt-2";
        div.innerHTML = `
            <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 overflow-hidden bg-neutral-100 border border-neutral-200">
                <img src="schippy.png" alt="Schippy" class="w-full h-full object-contain" onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/2565/2565174.png'">
            </div>
            <div class="text-[13px] text-neutral-900 w-full leading-[1.6] pt-[3px] font-sans">
                <div class="flex items-start gap-2 mb-4">
                    <div class="w-4 h-4 rounded bg-success-500 flex items-center justify-center shrink-0 mt-0.5">
                        <i data-lucide="check" class="w-3 h-3 text-white"></i>
                    </div>
                    <div>
                        <p class="font-bold">Changes Applied:</p>
                        <ul class="list-disc pl-4 text-neutral-800 marker:text-neutral-800">
                            <li>Material ID : <strong>${session.identifiedBatch.materialId}</strong></li>
                            <li>Batch: <strong>${session.identifiedBatch.batchId}</strong></li>
                            <li>Route: <strong>${proposal.proposedRouteText}</strong></li>
                            <li>Weight: <strong>81,700 lbs</strong></li>
                            <li>Optimization recalculated</li>
                            <li>Logged: ${new Date().toISOString().split('T')[0]}</li>
                        </ul>
                    </div>
                </div>
                
                <p class="mb-3">The batch will route <strong>${proposal.proposedRouteText}</strong> with a <strong>${proposal.netBenefit} net benefit</strong>.</p>
                <p>Need to adjust another batch or compare an alternative route?</p>
            </div>
        `;
        chatBox.appendChild(div);
        if(window.lucide) lucide.createIcons();
        prefillInput("That's all, thanks.");
        scrollToBottom();

        // 🚨 HIGHLIGHT ROW 2 (index 1) to match the image prototype
        const highlightRow = tableBody.children[1];
        highlightRow.classList.remove('hover:bg-neutral-100'); // remove hover color
        highlightRow.classList.add('bg-[#F3F0FF]', 'transition-all', 'duration-500'); // Persistent purple background
        
        // Change action select
        const actionSelect = highlightRow.querySelectorAll('select')[0];
        // Populate the select with a "Text Value" option if it doesn't have it
        if (!Array.from(actionSelect.options).some(opt => opt.value === "Text Value")) {
             actionSelect.innerHTML += '<option value="Text Value">Text Value</option>';
        }
        actionSelect.value = "Text Value"; 
        actionSelect.classList.remove('border-neutral-300');
        actionSelect.classList.add('border-copilot-brand', 'text-copilot-brand', 'font-medium', 'ring-1', 'ring-copilot-brand');
        
        // Target the Extend column specific inner structure for highlight
        const extendTd = highlightRow.children[9];
        extendTd.classList.add('border-2', 'border-copilot-brand', 'rounded-sm', 'bg-[#F3F0FF]', 'relative');
        extendTd.classList.remove('border-neutral-200');
        
        // Update the checkmark icon
        const rowCheck = extendTd.querySelector('i[data-lucide="check"]');
        if(rowCheck) {
            rowCheck.outerHTML = `<div class="w-5 h-5 rounded border border-copilot-brand bg-white flex items-center justify-center shrink-0 absolute right-4 top-1/2 -translate-y-1/2"><i data-lucide="check" class="w-3.5 h-3.5 text-copilot-brand stroke-[3]"></i></div>`;
        }

        // Check the main row checkbox
        const mainCheck = highlightRow.querySelector('input[type="checkbox"]');
        if(mainCheck) {
            mainCheck.checked = true;
            mainCheck.classList.add('accent-copilot-brand');
        }
        
        if(window.lucide) lucide.createIcons();
    }

    function appendMessage(content, sender) {
        const messageDiv = document.createElement("div");
        
        if (sender === 'bot') {
            // Figma Design: Plain text next to avatar
            messageDiv.className = `flex items-start gap-3 w-full animate-fade-in-up font-sans mt-2`;
            messageDiv.innerHTML = `
                <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 overflow-hidden bg-neutral-100 border border-neutral-200">
                    <img src="schippy.png" alt="Schippy" class="w-full h-full object-contain" onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/2565/2565174.png'">
                </div>
                <div class="text-[13px] text-neutral-900 w-full leading-[1.6] pt-[3px] font-sans">
                    ${content}
                </div>
            `;
        } else {
            // Figma Design: User gray background
            messageDiv.className = `flex flex-col gap-1 w-full max-w-[85%] self-end items-end animate-fade-in-up`;
            messageDiv.innerHTML = `
                <div class="bg-neutral-100 text-neutral-800 rounded-lg px-4 py-2.5 text-[13px] break-words leading-[1.6] font-sans border border-neutral-200/50">
                    ${escapeHtml(content)}
                </div>
            `;
        }
        
        chatBox.appendChild(messageDiv);
        if (window.lucide) window.lucide.createIcons();
        scrollToBottom();
    }

    function prefillInput(text) {
        userInput.value = text;
        userInput.focus();
    }

    function showTypingIndicator() {
        const div = document.createElement("div");
        div.id = "typing-indicator";
        div.className = "flex items-start gap-3 w-full animate-fade-in-up font-sans mt-2";
        div.innerHTML = `
            <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 overflow-hidden bg-neutral-100 border border-neutral-200">
                <img src="schippy.png" alt="Schippy" class="w-full h-full object-contain" onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/2565/2565174.png'">
            </div>
            <div class="typing-indicator flex space-x-1 pt-2.5">
                <span></span><span></span><span></span>
            </div>
        `;
        chatBox.appendChild(div);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        const indicator = document.getElementById("typing-indicator");
        if (indicator) indicator.remove();
    }

    function scrollToBottom() {
        chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/\n/g, "<br>");
    }
    
    if (window.lucide) {
        window.lucide.createIcons();
    }
});
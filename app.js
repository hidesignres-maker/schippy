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
    function openPanel() {
        copilotPanel.classList.remove('translate-x-full');
        panelOverlay.classList.remove('hidden');
        setTimeout(() => { panelOverlay.classList.remove('opacity-0'); }, 10);
    }
    function closePanel() {
        copilotPanel.classList.add('translate-x-full');
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
        newDestination: null
    };

    function resetSession() {
        session.flow = null;
        session.state = 'idle';
        session.identifiedBatch = null;
        session.changeScope = null;
        session.newOrigin = null;
        session.newDestination = null;
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
            
            if (session.state === "idle") {
                const welcomeScreen = document.getElementById("welcome-screen");
                if (welcomeScreen) welcomeScreen.remove();

                if (lowerText.includes('move') || lowerText.includes('batch')) {
                    session.flow = 'move_batch';
                    session.state = 'awaiting_batch_reference';
                    appendMessage("Hi Mariana, let's move a batch. Which route would you like to move? You can provide a material ID, batch ID, or store location.", "bot");
                } else if (lowerText.includes('summary') || lowerText.includes('report')) {
                    appendMessage("Here's a quick summary of your current view: You have 74 total scenarios, with 50 in STO status requiring attention. The overall OTS is at 96.01%.", "bot");
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
                session.newOrigin = text;
                session.state = "analyzing_proposal";
                triggerAnalysis();
            
            } else if (session.state === "awaiting_new_destination") {
                session.newDestination = text;
                session.state = "analyzing_proposal";
                triggerAnalysis();
            
            } else if (session.state === "awaiting_new_origin_and_destination") {
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
                    appendMessage(`<span class="text-copilot-brand flex items-center gap-2 mb-1"><i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Updating batch routing...</span>
                    <span class="text-copilot-brand flex items-center gap-2"><i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Applying changes and refreshing the STO view...</span>`, 'bot');
                    
                    setTimeout(() => {
                        renderSummaryAndApply();
                        session.state = "completed";
                    }, 2000);
                } else if (lowerText.includes('no') || lowerText.includes('don') || lowerText.includes('cancel')) {
                    session.state = "cancelled_no_change";
                    appendMessage(`No problem. I'll leave the batch routing unchanged. Your original data remains unchanged.`, 'bot');
                } else {
                    appendMessage("Would you like to proceed with this change?", 'bot');
                    prefillInput("Yes");
                }

            } else if (session.state === "completed" || session.state === "cancelled_no_change") {
                appendMessage("The previous flow is complete. I can help you move another batch or give you a summary.", 'bot');
                resetSession();
            }
            
            scrollToBottom();
        }, 1000);
    }

    function triggerAnalysis() {
        appendMessage(`Got it. Let me run a comparative analysis between your current route and the proposed change...<br><br>
        <span class="text-copilot-brand flex items-center gap-2 mb-1"><i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Checking inventory & constraints...</span>
        <span class="text-copilot-brand flex items-center gap-2 mb-3"><i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Analyzing lane availability...</span>
        <strong>All good. Running route comparison...</strong>`, 'bot');
        
        setTimeout(() => {
            renderComparisonTable();
            session.state = "awaiting_apply_decision";
        }, 2000);
    }

    function renderComparisonTable() {
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
                            <th class="py-2 font-bold text-neutral-900 leading-tight">Current:<br><span class="font-normal text-neutral-600">3389 → 3442</span></th>
                            <th class="py-2 font-bold text-neutral-900 leading-tight">Proposed:<br><span class="font-normal text-neutral-600">4040 → 3944</span></th>
                            <th class="py-2 font-bold text-neutral-900">Δ / Impact</th>
                        </tr>
                    </thead>
                    <tbody class="text-neutral-800">
                        <tr class="border-b border-neutral-100">
                            <td class="py-2 font-bold">Trucks</td><td class="py-2">1.5</td><td class="py-2">1</td>
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
                            <td class="py-2 font-bold">Transp. $</td><td class="py-2">$3,200</td><td class="py-2">$3,050</td>
                            <td class="py-2 text-success-700 leading-tight"><div class="flex items-center gap-1"><i data-lucide="arrow-down" class="w-3 h-3"></i> $150 (~5%)</div></td>
                        </tr>
                        <tr class="border-b border-neutral-100">
                            <td class="py-2 font-bold">Mit. Val.</td><td class="py-2">$8,210</td><td class="py-2">$8,420</td>
                            <td class="py-2 text-error-500 leading-tight"><div class="flex items-center gap-1"><i data-lucide="arrow-up" class="w-3 h-3"></i> $210</div></td>
                        </tr>
                        <tr>
                            <td class="py-2 font-bold">Net $</td><td class="py-2">—</td><td class="py-2">—</td>
                            <td class="py-2 text-success-700 font-bold">+ $360</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="mb-4">
                    <p class="text-[13px] text-neutral-900 leading-snug"><strong>Recommendation:</strong> Apply the trimmed configuration — it improves efficiency and lowers cost while keeping weight and cases stable.</p>
                    <p class="text-[12px] text-neutral-600 mt-2 leading-snug flex items-start gap-1"><span class="text-warning-500 font-bold">⚠️</span> <span>Note: This assumes standard 45k lbs per truck capacity; warehouse slotting and carrier availability should still be confirmed.</span></p>
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
        
        // Render bot message with summary
        const div = document.createElement('div');
        div.className = "flex items-start gap-3 w-full animate-fade-in-up font-sans mt-2";
        div.innerHTML = `
            <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 overflow-hidden bg-neutral-100 border border-neutral-200">
                <img src="schippy.png" alt="Schippy" class="w-full h-full object-contain" onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/2565/2565174.png'">
            </div>
            <div class="text-[13px] text-neutral-900 w-full leading-[1.6] pt-[3px] font-sans">
                <p class="mb-4">Perfect. I'm updating the batch movement now.</p>
                
                <div class="flex items-start gap-2 mb-4">
                    <div class="w-4 h-4 rounded bg-success-500 flex items-center justify-center shrink-0 mt-0.5">
                        <i data-lucide="check" class="w-3 h-3 text-white"></i>
                    </div>
                    <div>
                        <p class="font-bold">Changes Applied:</p>
                        <ul class="list-disc pl-4 text-neutral-800 marker:text-neutral-800">
                            <li>Material ID : <strong>10034895248939888</strong></li>
                            <li>Batch: <strong>071124GP</strong></li>
                            <li>Origin Plant: <strong>4040 — Gatorade DC Lakeland SVC CTR (FL)</strong></li>
                            <li>Current Destination: <strong>3944 — Quaker DC Lancaster TX</strong></li>
                            <li>Weight: <strong>81,700 lbs</strong></li>
                            <li>Optimization recalculated</li>
                            <li>Logged: 2025-10-14 14:32:05</li>
                        </ul>
                    </div>
                </div>
                
                <p class="mb-3">The batch will route 4040 → <strong>3944</strong> with a <strong>$360 net benefit</strong>.</p>
                <p>Need to adjust another batch or compare an alternative origin?</p>
            </div>
        `;
        chatBox.appendChild(div);
        if(window.lucide) lucide.createIcons();
        prefillInput("Thanks");
        scrollToBottom();

        // 🚨 MAGIC HAPPENS HERE: Update the actual Data Table behind the Copilot 🚨
        const firstRow = tableBody.children[0];
        firstRow.classList.add('bg-copilot-brand/5', 'transition-all', 'duration-500');
        
        // Change action select
        const actionSelect = firstRow.querySelector('select');
        actionSelect.value = "Text Value"; // Simulate selecting something
        actionSelect.classList.add('border-copilot-brand', 'text-copilot-brand', 'font-medium', 'ring-1', 'ring-copilot-brand');
        
        // Check the checkbox at the end of row
        const rowCheck = firstRow.querySelector('i[data-lucide="check"]');
        if(rowCheck) {
            rowCheck.classList.remove('text-neutral-400');
            rowCheck.classList.add('text-copilot-brand');
        }

        // Check the main row checkbox
        const mainCheck = firstRow.querySelector('input[type="checkbox"]');
        if(mainCheck) mainCheck.checked = true;

        setTimeout(() => {
            firstRow.classList.remove('bg-copilot-brand/5');
        }, 3000);
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
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

    // --- POPULATE ACCORDION DATA ---
    const accordionData = [
        { origin: '3389', originName: 'BEVERAGE INDIANAPOLIS SVC CTR', dest: '8263', destName: '2206 (PCNA DC JOLIET ECOMM SVC IL)', metrics: '14 Items, 5,847 CS, 39 PAL, 42,230 LBS, 2.64 Trucks', transp: '$1,962', mitigated: '$70,664', expanded: true },
        { origin: '1062', originName: 'GATORADE CP MSI GRAND PRAIRIE', dest: '8263', destName: '2206 (PCNA DC JOLIET ECOMM SVC IL)', metrics: '1 Item, 263,840 CS, 2932 PAL, 1,878,541 LBS, 117.41 Trucks', transp: '$205,674', mitigated: '$47,491', expanded: false },
        { origin: '3936', originName: 'QUAKER DC SAN BERN CA SRV CTR', dest: '8225', destName: '3264 (GATORADE DC TRACY CA)', metrics: '9 Items, 873 CS, 10 PAL, 8,937 LBS, 0.56 Trucks', transp: '$1,204', mitigated: '$13,919', expanded: false },
        { origin: '3216', originName: 'QTG-ATLANTA CAMPUS', dest: '8263', destName: '2206 (PCNA DC JOLIET ECOMM SVC IL)', metrics: '5 Items, 524 CS, 8 PAL, 8,019 LBS, 0.50 Trucks', transp: '$1,111', mitigated: '$12,239', expanded: false },
        { origin: '2033', originName: 'QUAKER RP ECOMM GRAND PRAIRIE', dest: '8263', destName: '2206 (PCNA DC JOLIET ECOMM SVC IL)', metrics: '6 Items, 20,940 CS, 235 PAL, 149,093 LBS, 9.32 Trucks', transp: '$6,730', mitigated: '$3,706', expanded: false },
        { origin: '2204', originName: 'QUAKER DC BLUE SPRINGS MO', dest: '8263', destName: '2206 (PCNA DC JOLIET ECOMM SVC IL)', metrics: '1 Item, 42 CS, 1 PAL, 1,907 LBS, 0.12 Trucks', transp: '$1,118', mitigated: '$2,472', expanded: false },
        { origin: '3971', originName: 'QUAKER DC TOLLESON AZ', dest: '8225', destName: '3264 (GATORADE DC TRACY CA)', metrics: '1 Item, 224 CS, 1 PAL, 1,167 LBS, 0.07 Trucks', transp: '$1,260', mitigated: '$2,085', expanded: false },
        { origin: '3227', originName: 'QUAKER DC CEDAR RAPIDS IA', dest: '8263', destName: '2206 (PCNA DC JOLIET ECOMM SVC IL)', metrics: '1 Item, 39 CS, 1 PAL, 278 LBS, 0.02 Trucks', transp: '$584', mitigated: '$536', expanded: false }
    ];

    let innerTableData = [
        { plant: '8225<br><span class="text-neutral-500 text-[10px] font-normal">3264</span>', plantName: 'Tracy', material: '000000000300055075<br><span class="text-neutral-500 text-[10px] font-normal">010052000054993000</span>', name: 'WH GAT GTRLT GLFRZ PET 20OZ 1PK 12CS', batch: '111425FS', loc: '3088', mfg: '11/18/20...', action: 'No Action', sub: 'Low/No De...', extend: '' },
        { plant: '8295<br><span class="text-neutral-500 text-[10px] font-normal">4024</span>', plantName: 'US-DC-DALLAS-TX-QSDI', material: '000000000300054642<br><span class="text-neutral-500 text-[10px] font-normal">010052000102458000</span>', name: 'WH GAT CHR PET 20OZ 8P3C', batch: '111525DL', loc: '3000', mfg: '11/15/20...', action: 'Unassigned', sub: '', extend: '' },
        { plant: '8170<br><span class="text-neutral-500 text-[10px] font-normal">4040</span>', plantName: 'US-DC-LAKELAND-FL-QSDI-SVC', material: '000000000300052726<br><span class="text-neutral-500 text-[10px] font-normal">010052000204084004</span>', name: 'WH GA LIQ 20OZ 6/4PK FP COC', batch: '53368B66XX', loc: '3000', mfg: '12/02/20...', action: 'Unassigned', sub: '', extend: '' },
        { plant: '8B66', plantName: 'BROOKSHIRE PGT', material: '000000000300038329', name: 'WH GAT GTRLT GLFRZ PET 20OZ 1PK 12CS', batch: '111425FS', loc: '3088', mfg: '11/18/20...', action: 'Unassigned', sub: '', extend: '' },
        { plant: '8B66', plantName: 'BROOKSHIRE PGT', material: '000000000300055075<br><span class="text-neutral-500 text-[10px] font-normal">010052000054993000</span>', name: 'WH GAT GTRLT GLFRZ PET 20OZ 1PK 12CS', batch: '111425FS', loc: '3088', mfg: '11/18/20...', action: 'STO (826...', sub: '--', extend: '45 Da...' },
        { plant: '8263<br><span class="text-neutral-500 text-[10px] font-normal">2206</span>', plantName: 'PCNA DC JOLIET ECOMM SVC IL', material: '000000000300055483<br><span class="text-neutral-500 text-[10px] font-normal">010052000043270000</span>', name: 'WH GAT G Z GRP PET 28OZ 1P15C', batch: '112125DL', loc: '3000', mfg: '11/24/20...', action: 'Unassigned', sub: '', extend: '' },
        { plant: '3994', plantName: '', material: '000000000300054643<br><span class="text-neutral-500 text-[10px] font-normal">010052000103127000</span>', name: 'WH GAT CHR PET 12OZ 12P2C GLCR', batch: '112125FS', loc: '3000', mfg: '11/24/20...', action: 'No Action', sub: 'Not Transf...', extend: '' },
        { plant: '8225<br><span class="text-neutral-500 text-[10px] font-normal">3264</span>', plantName: 'GATORADE DC TRACY CA', material: '000000000300052736<br><span class="text-neutral-500 text-[10px] font-normal">010052000241201009</span>', name: 'WH GA LQ CRE 24OZ 24CS LL KENNY', batch: '111025AZ', loc: '3000', mfg: '11/10/20...', action: 'Unassigned', sub: '', extend: '' },
        { plant: '8290<br><span class="text-neutral-500 text-[10px] font-normal">3944</span>', plantName: 'QUAKER DC LANCASTER TX', material: '000000000300054834<br><span class="text-neutral-500 text-[10px] font-normal">000052000063455000</span>', name: 'WH GAT GTRLT PNPLMGO PET 20OZ 1PK 12CS', batch: '5268839002', loc: '3000', mfg: '09/25/20...', action: 'Unassigned', sub: '', extend: '' },
        { plant: '2204', plantName: 'QUAKER DC BLUE SPRINGS MO', material: '000000000300054643<br><span class="text-neutral-500 text-[10px] font-normal">010052000103127000</span>', name: 'WH GAT CHR PET 12OZ 12P2C GLCR', batch: '111225FS', loc: '3000', mfg: '11/10/20...', action: 'Unassigned', sub: '', extend: '' },
        { plant: '3971', plantName: 'QUAKER DC TOLLESON AZ', material: '000000000300054706<br><span class="text-neutral-500 text-[10px] font-normal">010052000047681000</span>', name: 'WH GAT LMNDCMBER PET 12OZ 12P2C', batch: '120225AZ', loc: '3000', mfg: '12/01/20...', action: 'Unassigned', sub: '', extend: '' }
    ];

    let currentSort = { column: null, asc: true };

    window.sortTable = function(column, accordionIndex) {
        if (currentSort.column === column) {
            currentSort.asc = !currentSort.asc;
        } else {
            currentSort.column = column;
            currentSort.asc = true;
        }
        
        innerTableData.sort((a, b) => {
            let valA = (a[column] || '').toString().replace(/<[^>]*>?/gm, '').trim();
            let valB = (b[column] || '').toString().replace(/<[^>]*>?/gm, '').trim();
            
            let numA = parseFloat(valA.replace(/[^0-9.-]+/g,""));
            let numB = parseFloat(valB.replace(/[^0-9.-]+/g,""));
            
            let isNumA = !isNaN(numA) && valA.match(/\d+/);
            let isNumB = !isNaN(numB) && valB.match(/\d+/);

            if (isNumA && isNumB) {
                return currentSort.asc ? numA - numB : numB - numA;
            }
            
            return currentSort.asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        });

        renderAccordionList(); // Re-render to show sorted data
    };

    window.toggleAccordion = function(index) {
        accordionData[index].expanded = !accordionData[index].expanded;
        renderAccordionList();
    };

    function renderAccordionList() {
        const accordionContainer = document.getElementById('accordion-list');
        if (!accordionContainer) return;
        
        accordionContainer.innerHTML = '';
        
        accordionData.forEach((item, index) => {
            const div = document.createElement('div');
            
            const borderClass = item.expanded ? 'border-neutral-200 shadow-sm' : 'border-neutral-200';
            const bgClass = item.expanded ? 'bg-[#F8F9FA]' : 'bg-white hover:bg-neutral-50';
            const icon = item.expanded ? 'chevron-down' : 'chevron-right';
            
            div.className = `border ${borderClass} rounded-[4px] overflow-hidden transition-colors flex-shrink-0`;
            
            let innerContent = '';
            if (item.expanded) {
                let rowsHTML = innerTableData.map(row => `
                    <tr class="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors text-[13px] bg-white">
                        <td class="px-4 py-2 font-mono font-normal text-neutral-700 align-middle leading-tight">${row.plant}</td>
                        <td class="px-4 py-2 font-sans text-neutral-700 align-middle">${row.plantName}</td>
                        <td class="px-4 py-2 font-mono font-normal text-neutral-700 align-middle leading-tight">${row.material}</td>
                        <td class="px-4 py-2 font-sans text-neutral-600 max-w-[150px] truncate align-middle" title="${row.name}">${row.name}</td>
                        <td class="px-4 py-2 font-sans text-neutral-700 align-middle">${row.batch}</td>
                        <td class="px-4 py-2 font-mono font-normal text-neutral-700 text-center align-middle">${row.loc}</td>
                        <td class="px-4 py-2 font-sans text-neutral-700 align-middle">${row.mfg}</td>
                        <td class="px-4 py-2 align-middle">
                            <select class="border border-neutral-200 rounded px-2 py-1 text-neutral-600 bg-transparent w-full max-w-[110px] text-ellipsis overflow-hidden whitespace-nowrap text-[13px] font-sans focus:outline-none focus:border-neutral-300 appearance-none" style="background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 6px center; background-size: 14px;">
                                <option value="Unassigned" ${row.action.includes('Unassigned') ? 'selected' : ''}>Unassigned</option>
                                <option value="Keep" ${row.action.includes('Keep') ? 'selected' : ''}>Keep</option>
                                <optgroup label="STO Options">
                                    <option value="STO_1" ${row.action.includes('STO') ? 'selected' : ''}>STO (8263/2206 - PCNA DC JOLIET ECOMM SVC IL)</option>
                                    <option value="STO_2">STO (8255/3442 - PCNA-CARLISLE SERVICE CENTER)</option>
                                </optgroup>
                                <option value="No Action" ${row.action.includes('No Action') ? 'selected' : ''}>No Action</option>
                            </select>
                        </td>
                        <td class="px-4 py-2 align-middle">
                            ${row.sub ? `
                            <select class="border border-neutral-200 rounded px-2 py-1 text-neutral-600 bg-transparent w-full max-w-[100px] text-ellipsis overflow-hidden whitespace-nowrap text-[13px] font-sans focus:outline-none focus:border-neutral-300 appearance-none" style="background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 6px center; background-size: 14px;">
                                <option>${row.sub}</option>
                            </select>
                            ` : ''}
                        </td>
                        <td class="px-4 py-2 align-middle">
                            ${row.extend ? `
                            <select class="border border-neutral-200 rounded px-2 py-1 text-neutral-600 bg-transparent w-full max-w-[80px] text-[13px] font-sans focus:outline-none focus:border-neutral-300 appearance-none" style="background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 6px center; background-size: 14px;">
                                <option>${row.extend}</option>
                            </select>
                            ` : ''}
                        </td>
                        <td class="px-4 py-2 text-center align-middle">
                            <button class="w-[24px] h-[24px] border border-neutral-300 rounded-[4px] flex items-center justify-center bg-white hover:border-[#1890FF] hover:bg-neutral-50 transition-colors group"><i data-lucide="check" class="w-4 h-4 text-neutral-300 group-hover:text-[#1890FF] transition-colors"></i></button>
                        </td>
                    </tr>
                `).join('');
                
                innerContent = `
                    <div class="overflow-x-auto border-t border-neutral-200 pb-2 bg-white">
                        <table class="w-full text-left whitespace-nowrap min-w-[1300px]">
                            <thead class="text-[10px] leading-tight text-neutral-500 font-medium uppercase tracking-wider border-b border-neutral-200 sticky top-0 bg-[#F8F9FA] z-10">
                                <tr>
                                    <th class="px-4 py-2 cursor-pointer" onclick="window.sortTable('plant', ${index})"><div class="flex items-center gap-1">PLANT <i data-lucide="chevrons-up-down" class="w-3 h-3 text-neutral-400"></i></div></th>
                                    <th class="px-4 py-2 cursor-pointer" onclick="window.sortTable('plantName', ${index})"><div class="flex items-center gap-1">PLANT NAME <i data-lucide="chevrons-up-down" class="w-3 h-3 text-neutral-400"></i></div></th>
                                    <th class="px-4 py-2 cursor-pointer" onclick="window.sortTable('material', ${index})"><div class="flex items-center gap-1">MATERIAL <i data-lucide="chevrons-up-down" class="w-3 h-3 text-neutral-400"></i></div></th>
                                    <th class="px-4 py-2 cursor-pointer" onclick="window.sortTable('name', ${index})"><div class="flex items-center gap-1">NAME <i data-lucide="chevrons-up-down" class="w-3 h-3 text-neutral-400"></i></div></th>
                                    <th class="px-4 py-2 cursor-pointer" onclick="window.sortTable('batch', ${index})"><div class="flex items-center gap-1">BATCH <i data-lucide="chevrons-up-down" class="w-3 h-3 text-neutral-400"></i></div></th>
                                    <th class="px-4 py-2 cursor-pointer" onclick="window.sortTable('loc', ${index})"><div class="flex items-center gap-1">STORAGE<br>LOCATION <i data-lucide="chevrons-up-down" class="w-3 h-3 text-neutral-400"></i></div></th>
                                    <th class="px-4 py-2 cursor-pointer" onclick="window.sortTable('mfg', ${index})"><div class="flex items-center gap-1">MFG DATE <i data-lucide="chevrons-up-down" class="w-3 h-3 text-neutral-400"></i></div></th>
                                    <th class="px-4 py-2 cursor-pointer" onclick="window.sortTable('action', ${index})"><div class="flex items-center gap-1">ASSIGNED<br>ACTION <i data-lucide="chevrons-up-down" class="w-3 h-3 text-neutral-400"></i></div></th>
                                    <th class="px-4 py-2 cursor-pointer" onclick="window.sortTable('sub', ${index})"><div class="flex items-center gap-1">SUB ACTION <i data-lucide="chevrons-up-down" class="w-3 h-3 text-neutral-400"></i></div></th>
                                    <th class="px-4 py-2 cursor-pointer" onclick="window.sortTable('extend', ${index})"><div class="flex items-center gap-1">EXTEND <i data-lucide="chevrons-up-down" class="w-3 h-3 text-neutral-400"></i></div></th>
                                    <th class="px-4 py-2 text-center align-middle"><div class="w-[24px] h-[24px] border border-neutral-300 rounded-[4px] flex items-center justify-center bg-white mx-auto"><i data-lucide="check" class="w-4 h-4 text-neutral-400"></i></div></th>
                                </tr>
                            </thead>
                            <tbody id="inner-table-body-${index}">
                                ${rowsHTML}
                            </tbody>
                        </table>
                    </div>
                `;
            }

            div.innerHTML = `
                <div class="${bgClass} flex items-center justify-between px-4 py-3 cursor-pointer" onclick="window.toggleAccordion(${index})">
                    <div class="flex items-center gap-3">
                        <i data-lucide="${icon}" class="w-4 h-4 text-neutral-500"></i>
                        <div class="w-2 h-2 rounded-full bg-[#F5A623]"></div>
                        <span class="text-[13px] font-sans text-neutral-900"><strong class="font-bold">${item.origin}</strong> (${item.originName}) &rarr; <strong class="font-bold">${item.dest}</strong>/${item.destName}</span>
                    </div>
                    <div class="flex items-center gap-8 text-[13px] text-neutral-700 font-sans">
                        <span>${item.metrics}</span>
                        <span>TRANSP: ${item.transp}</span>
                        <span>MITIGATED: ${item.mitigated}</span>
                    </div>
                </div>
                ${innerContent}
            `;
            
            accordionContainer.appendChild(div);
        });
        
        if(window.lucide) lucide.createIcons();
    }
    
    renderAccordionList();

    // --- PANEL TOGGLE LOGIC ---
    const mainContent = document.getElementById('main-content');
    const historyBtn = document.getElementById('history-btn');
    const historyView = document.getElementById('history-view');

    function toggleHistory() {
        if (historyView.classList.contains('hidden')) {
            historyView.classList.remove('hidden');
            historyView.classList.add('flex');
            historyBtn.classList.add('bg-copilot-brand/10');
        } else {
            historyView.classList.add('hidden');
            historyView.classList.remove('flex');
            historyBtn.classList.remove('bg-copilot-brand/10');
        }
    }

    if (historyBtn) historyBtn.addEventListener('click', toggleHistory);

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
        
        // Hide history if open
        if (historyView && !historyView.classList.contains('hidden')) {
            historyView.classList.add('hidden');
            historyView.classList.remove('flex');
            if (historyBtn) historyBtn.classList.remove('bg-copilot-brand/10');
        }

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
                <div class="mb-6 flex justify-center items-center">
                    <img src="img/schippy-illustration.png" alt="Schippy Welcome" class="w-32 h-32 object-contain">
                </div>
                <h3 class="text-center text-[22px] font-bold text-neutral-900 leading-[1.3] mb-6 tracking-tight font-sans">Hi Mariana,<br>Welcome back! How Can I help?</h3>
                <div class="flex gap-3">
                    <button onclick="window.startMoveBatch()" class="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-2.5 rounded-lg text-sm font-normal transition-colors border border-transparent hover:border-neutral-300">Move a batch</button>
                    <button onclick="window.sendQuickReply('Give me the summary')" class="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-2.5 rounded-lg text-sm font-normal transition-colors border border-transparent hover:border-neutral-300">Give me the summary</button>
                </div>
            </div>
        `;
    }

    function renderMoveBatchHeader() {
        const header = document.createElement('div');
        header.className = "flex flex-col items-center justify-center pt-2 pb-0 w-full animate-fade-in-up";
        header.innerHTML = `
            <div class="mb-3 flex justify-center items-center">
                <img src="img/schippy-illustration.png" alt="Schippy" class="w-20 h-20 object-contain">
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
                        <img src="img/schippy-avatar.png" alt="Schippy" class="w-full h-full object-cover">
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
                <img src="img/schippy-avatar.png" alt="Schippy" class="w-full h-full object-cover">
            </div>
            <div class="w-full">
                <!-- Structured Summary Card -->
                <div class="bg-white border border-neutral-200 rounded-[8px] p-4 shadow-sm mb-3 w-full relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-1 bg-copilot-brand opacity-80"></div>
                    <div class="flex items-center gap-2 mb-3">
                        <div class="w-6 h-6 rounded bg-copilot-bg flex items-center justify-center text-copilot-brand">
                            <i data-lucide="bar-chart-2" class="w-3.5 h-3.5"></i>
                        </div>
                        <h4 class="text-[12px] font-bold text-neutral-600 uppercase tracking-widest">${summary.title}</h4>
                    </div>
                    <div class="text-[26px] font-bold text-neutral-900 mb-4 tracking-tight leading-none">${summary.mainValue}</div>
                    
                    <div class="mb-3">
                        ${breakdownHTML}
                    </div>
                    <div class="bg-neutral-50 rounded-md p-2 mt-2 border border-neutral-100">
                        <p class="text-[11px] text-neutral-500 flex items-start gap-1.5 leading-snug"><i data-lucide="info" class="w-3.5 h-3.5 shrink-0 text-neutral-400 mt-0.5"></i> <span>${summary.context}</span></p>
                    </div>
                </div>
                
                <p class="text-[13px] text-neutral-900 mb-2">Would you like to explore this further?</p>
                <div class="flex flex-wrap gap-2">
                    <button onclick="window.sendQuickReply('Break it down by origin')" class="quick-reply-btn bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 px-3 py-1.5 rounded-full text-[12px] font-normal transition-colors shadow-sm">Break it down by origin</button>
                    <button onclick="window.sendQuickReply('Show destinations')" class="quick-reply-btn bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 px-3 py-1.5 rounded-full text-[12px] font-normal transition-colors shadow-sm">Show destinations</button>
                    <button onclick="window.sendQuickReply('Total weight')" class="quick-reply-btn bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 px-3 py-1.5 rounded-full text-[12px] font-normal transition-colors shadow-sm">Total weight</button>
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
                    <img src="img/schippy-avatar.png" alt="Schippy" class="w-full h-full object-cover">
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
                <img src="img/schippy-avatar.png" alt="Schippy" class="w-full h-full object-cover">
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

        // 🚨 HIGHLIGHT ROW 1 (index 0) of the expanded accordion to simulate the AI action
        const innerTableBody = document.getElementById('inner-table-body-0');
        if (innerTableBody) {
            const highlightRow = innerTableBody.children[0];
            highlightRow.classList.add('bg-[#F3F0FF]', 'transition-all', 'duration-500'); // Persistent purple background
            
            // Target the ASSIGNED ACTION select (index 0 of selects inside the row)
            const actionSelect = highlightRow.querySelectorAll('select')[0];
            if (actionSelect) {
                actionSelect.innerHTML = '<option value="Assigned">Assigned</option>';
                actionSelect.classList.remove('border-neutral-300', 'text-neutral-700');
                actionSelect.classList.add('border-copilot-brand', 'text-copilot-brand', 'font-medium', 'ring-1', 'ring-copilot-brand');
            }
            
            // Update the checkbox button in the final column
            const btnTd = highlightRow.children[10]; // Note: index changed due to more columns
            const btn = btnTd.querySelector('button');
            if (btn) {
                btn.classList.remove('border-neutral-300', 'bg-white', 'hover:bg-neutral-50');
                btn.classList.add('border-copilot-brand', 'bg-copilot-brand');
                btn.innerHTML = '<i data-lucide="check" class="w-4 h-4 text-white"></i>';
            }
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
                    <img src="img/schippy-avatar.png" alt="Schippy" class="w-full h-full object-cover">
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
                <img src="img/schippy-avatar.png" alt="Schippy" class="w-full h-full object-cover">
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
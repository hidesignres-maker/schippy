document.addEventListener("DOMContentLoaded", () => {
  // --- UI ELEMENTS ---
  const fabButton = document.getElementById("fab-copilot");
  const closeButton = document.getElementById("close-copilot");
  const copilotPanel = document.getElementById("copilot-panel");
  const panelOverlay = document.getElementById("panel-overlay");
  const tableBody = document.getElementById("table-body");
  const chatBox = document.getElementById("chat-box");
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");

  // --- POPULATE ACCORDION DATA ---
  const accordionData = [
    {
      origin: "3389",
      originName: "BEVERAGE INDIANAPOLIS SVC CTR",
      dest: "8263",
      destName: "2206 (PCNA DC JOLIET ECOMM SVC IL)",
      metrics: "14 Items, 5,847 CS, 39 PAL, 42,230 LBS, 2.64 Trucks",
      transp: "$1,962",
      mitigated: "$70,664",
      expanded: true,
    },
    {
      origin: "1062",
      originName: "GATORADE CP MSI GRAND PRAIRIE",
      dest: "8263",
      destName: "2206 (PCNA DC JOLIET ECOMM SVC IL)",
      metrics: "1 Item, 263,840 CS, 2932 PAL, 1,878,541 LBS, 117.41 Trucks",
      transp: "$205,674",
      mitigated: "$47,491",
      expanded: false,
    },
    {
      origin: "3936",
      originName: "QUAKER DC SAN BERN CA SRV CTR",
      dest: "8225",
      destName: "3264 (GATORADE DC TRACY CA)",
      metrics: "9 Items, 873 CS, 10 PAL, 8,937 LBS, 0.56 Trucks",
      transp: "$1,204",
      mitigated: "$13,919",
      expanded: false,
    },
    {
      origin: "3216",
      originName: "QTG-ATLANTA CAMPUS",
      dest: "8263",
      destName: "2206 (PCNA DC JOLIET ECOMM SVC IL)",
      metrics: "5 Items, 524 CS, 8 PAL, 8,019 LBS, 0.50 Trucks",
      transp: "$1,111",
      mitigated: "$12,239",
      expanded: false,
    },
    {
      origin: "2033",
      originName: "QUAKER RP ECOMM GRAND PRAIRIE",
      dest: "8263",
      destName: "2206 (PCNA DC JOLIET ECOMM SVC IL)",
      metrics: "6 Items, 20,940 CS, 235 PAL, 149,093 LBS, 9.32 Trucks",
      transp: "$6,730",
      mitigated: "$3,706",
      expanded: false,
    },
    {
      origin: "2204",
      originName: "QUAKER DC BLUE SPRINGS MO",
      dest: "8263",
      destName: "2206 (PCNA DC JOLIET ECOMM SVC IL)",
      metrics: "1 Item, 42 CS, 1 PAL, 1,907 LBS, 0.12 Trucks",
      transp: "$1,118",
      mitigated: "$2,472",
      expanded: false,
    },
    {
      origin: "3971",
      originName: "QUAKER DC TOLLESON AZ",
      dest: "8225",
      destName: "3264 (GATORADE DC TRACY CA)",
      metrics: "1 Item, 224 CS, 1 PAL, 1,167 LBS, 0.07 Trucks",
      transp: "$1,260",
      mitigated: "$2,085",
      expanded: false,
    },
    {
      origin: "3227",
      originName: "QUAKER DC CEDAR RAPIDS IA",
      dest: "8263",
      destName: "2206 (PCNA DC JOLIET ECOMM SVC IL)",
      metrics: "1 Item, 39 CS, 1 PAL, 278 LBS, 0.02 Trucks",
      transp: "$584",
      mitigated: "$536",
      expanded: false,
    },
  ];

  let innerTableData = [
    {
      plant:
        '8225<br><span class="text-neutral-500 text-[10px] font-normal">3264</span>',
      plantName: "Tracy",
      material:
        '000000000300055075<br><span class="text-neutral-500 text-[10px] font-normal">010052000054993000</span>',
      name: "WH GAT GTRLT GLFRZ PET 20OZ 1PK 12CS",
      batch: "111425FS",
      loc: "3088",
      mfg: "11/18/20...",
      action: "No Action",
      sub: "Low/No De...",
      extend: "",
    },
    {
      plant:
        '8295<br><span class="text-neutral-500 text-[10px] font-normal">4024</span>',
      plantName: "US-DC-DALLAS-TX-QSDI",
      material:
        '000000000300054642<br><span class="text-neutral-500 text-[10px] font-normal">010052000102458000</span>',
      name: "WH GAT CHR PET 20OZ 8P3C",
      batch: "111525DL",
      loc: "3000",
      mfg: "11/15/20...",
      action: "Unassigned",
      sub: "",
      extend: "",
    },
    {
      plant:
        '8170<br><span class="text-neutral-500 text-[10px] font-normal">4040</span>',
      plantName: "US-DC-LAKELAND-FL-QSDI-SVC",
      material:
        '000000000300052726<br><span class="text-neutral-500 text-[10px] font-normal">010052000204084004</span>',
      name: "WH GA LIQ 20OZ 6/4PK FP COC",
      batch: "53368B66XX",
      loc: "3000",
      mfg: "12/02/20...",
      action: "Unassigned",
      sub: "",
      extend: "",
    },
    {
      plant: "8B66",
      plantName: "BROOKSHIRE PGT",
      material: "000000000300038329",
      name: "WH GAT GTRLT GLFRZ PET 20OZ 1PK 12CS",
      batch: "111425FS",
      loc: "3088",
      mfg: "11/18/20...",
      action: "Unassigned",
      sub: "",
      extend: "",
    },
    {
      plant: "8B66",
      plantName: "BROOKSHIRE PGT",
      material:
        '000000000300055075<br><span class="text-neutral-500 text-[10px] font-normal">010052000054993000</span>',
      name: "WH GAT GTRLT GLFRZ PET 20OZ 1PK 12CS",
      batch: "111425FS",
      loc: "3088",
      mfg: "11/18/20...",
      action: "STO (826...",
      sub: "--",
      extend: "45 Da...",
    },
    {
      plant:
        '8263<br><span class="text-neutral-500 text-[10px] font-normal">2206</span>',
      plantName: "PCNA DC JOLIET ECOMM SVC IL",
      material:
        '000000000300055483<br><span class="text-neutral-500 text-[10px] font-normal">010052000043270000</span>',
      name: "WH GAT G Z GRP PET 28OZ 1P15C",
      batch: "112125DL",
      loc: "3000",
      mfg: "11/24/20...",
      action: "Unassigned",
      sub: "",
      extend: "",
    },
    {
      plant: "3994",
      plantName: "",
      material:
        '000000000300054643<br><span class="text-neutral-500 text-[10px] font-normal">010052000103127000</span>',
      name: "WH GAT CHR PET 12OZ 12P2C GLCR",
      batch: "112125FS",
      loc: "3000",
      mfg: "11/24/20...",
      action: "No Action",
      sub: "Not Transf...",
      extend: "",
    },
    {
      plant:
        '8225<br><span class="text-neutral-500 text-[10px] font-normal">3264</span>',
      plantName: "GATORADE DC TRACY CA",
      material:
        '000000000300052736<br><span class="text-neutral-500 text-[10px] font-normal">010052000241201009</span>',
      name: "WH GA LQ CRE 24OZ 24CS LL KENNY",
      batch: "111025AZ",
      loc: "3000",
      mfg: "11/10/20...",
      action: "Unassigned",
      sub: "",
      extend: "",
    },
    {
      plant:
        '8290<br><span class="text-neutral-500 text-[10px] font-normal">3944</span>',
      plantName: "QUAKER DC LANCASTER TX",
      material:
        '000000000300054834<br><span class="text-neutral-500 text-[10px] font-normal">000052000063455000</span>',
      name: "WH GAT GTRLT PNPLMGO PET 20OZ 1PK 12CS",
      batch: "5268839002",
      loc: "3000",
      mfg: "09/25/20...",
      action: "Unassigned",
      sub: "",
      extend: "",
    },
    {
      plant: "2204",
      plantName: "QUAKER DC BLUE SPRINGS MO",
      material:
        '000000000300054643<br><span class="text-neutral-500 text-[10px] font-normal">010052000103127000</span>',
      name: "WH GAT CHR PET 12OZ 12P2C GLCR",
      batch: "111225FS",
      loc: "3000",
      mfg: "11/10/20...",
      action: "Unassigned",
      sub: "",
      extend: "",
    },
    {
      plant: "3971",
      plantName: "QUAKER DC TOLLESON AZ",
      material:
        '000000000300054706<br><span class="text-neutral-500 text-[10px] font-normal">010052000047681000</span>',
      name: "WH GAT LMNDCMBER PET 12OZ 12P2C",
      batch: "120225AZ",
      loc: "3000",
      mfg: "12/01/20...",
      action: "Unassigned",
      sub: "",
      extend: "",
    },
  ];

  let currentSort = { column: null, asc: true };

  window.sortTable = function (column, accordionIndex) {
    if (currentSort.column === column) {
      currentSort.asc = !currentSort.asc;
    } else {
      currentSort.column = column;
      currentSort.asc = true;
    }

    innerTableData.sort((a, b) => {
      let valA = (a[column] || "")
        .toString()
        .replace(/<[^>]*>?/gm, "")
        .trim();
      let valB = (b[column] || "")
        .toString()
        .replace(/<[^>]*>?/gm, "")
        .trim();

      let numA = parseFloat(valA.replace(/[^0-9.-]+/g, ""));
      let numB = parseFloat(valB.replace(/[^0-9.-]+/g, ""));

      let isNumA = !isNaN(numA) && valA.match(/\d+/);
      let isNumB = !isNaN(numB) && valB.match(/\d+/);

      if (isNumA && isNumB) {
        return currentSort.asc ? numA - numB : numB - numA;
      }

      return currentSort.asc
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

    renderAccordionList(); // Re-render to show sorted data
  };

  window.toggleAccordion = function (index) {
    accordionData[index].expanded = !accordionData[index].expanded;
    renderAccordionList();
  };

  function renderAccordionList() {
    const accordionContainer = document.getElementById("accordion-list");
    if (!accordionContainer) return;

    accordionContainer.innerHTML = "";

    accordionData.forEach((item, index) => {
      const div = document.createElement("div");

      const borderClass = item.expanded
        ? "border-neutral-200 shadow-sm"
        : "border-neutral-200";
      const bgClass = item.expanded
        ? "bg-[#F8F9FA]"
        : "bg-white hover:bg-neutral-50";
      const icon = item.expanded ? "chevron-down" : "chevron-right";

      div.className = `border ${borderClass} rounded-[4px] overflow-hidden transition-colors flex-shrink-0`;

      let innerContent = "";
      if (item.expanded) {
        let rowsHTML = innerTableData
          .map(
            (row) => `
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
                                <option value="Unassigned" ${row.action.includes("Unassigned") ? "selected" : ""}>Unassigned</option>
                                <option value="Keep" ${row.action.includes("Keep") ? "selected" : ""}>Keep</option>
                                <optgroup label="STO Options">
                                    <option value="STO_1" ${row.action.includes("STO") ? "selected" : ""}>STO (8263/2206 - PCNA DC JOLIET ECOMM SVC IL)</option>
                                    <option value="STO_2">STO (8255/3442 - PCNA-CARLISLE SERVICE CENTER)</option>
                                </optgroup>
                                <option value="No Action" ${row.action.includes("No Action") ? "selected" : ""}>No Action</option>
                            </select>
                        </td>
                        <td class="px-4 py-2 align-middle">
                            ${
                              row.sub
                                ? `
                            <select class="border border-neutral-200 rounded px-2 py-1 text-neutral-600 bg-transparent w-full max-w-[100px] text-ellipsis overflow-hidden whitespace-nowrap text-[13px] font-sans focus:outline-none focus:border-neutral-300 appearance-none" style="background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 6px center; background-size: 14px;">
                                <option>${row.sub}</option>
                            </select>
                            `
                                : ""
                            }
                        </td>
                        <td class="px-4 py-2 align-middle">
                            ${
                              row.extend
                                ? `
                            <select class="border border-neutral-200 rounded px-2 py-1 text-neutral-600 bg-transparent w-full max-w-[80px] text-[13px] font-sans focus:outline-none focus:border-neutral-300 appearance-none" style="background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 6px center; background-size: 14px;">
                                <option>${row.extend}</option>
                            </select>
                            `
                                : ""
                            }
                        </td>
                        <td class="px-4 py-2 text-center align-middle">
                            <button class="w-[24px] h-[24px] border border-neutral-300 rounded-[4px] flex items-center justify-center bg-white hover:border-[#1890FF] hover:bg-neutral-50 transition-colors group"><i data-lucide="check" class="w-4 h-4 text-neutral-300 group-hover:text-[#1890FF] transition-colors"></i></button>
                        </td>
                    </tr>
                `,
          )
          .join("");

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

    if (window.lucide) lucide.createIcons();
  }

  renderAccordionList();

  // --- PANEL TOGGLE LOGIC ---
  const mainContent = document.getElementById("main-content");
  const historyBtn = document.getElementById("history-btn");
  const historyView = document.getElementById("history-view");

  function toggleHistory() {
    if (historyView.classList.contains("hidden")) {
      historyView.classList.remove("hidden");
      historyView.classList.add("flex");
      historyBtn.classList.add("bg-copilot-brand/10");
    } else {
      historyView.classList.add("hidden");
      historyView.classList.remove("flex");
      historyBtn.classList.remove("bg-copilot-brand/10");
    }
  }

  if (historyBtn) historyBtn.addEventListener("click", toggleHistory);

  let scrollPosition = 0;

  function openPanel() {
    copilotPanel.classList.remove("translate-x-full");
    panelOverlay.classList.remove("hidden");
    setTimeout(() => {
      panelOverlay.classList.remove("opacity-0");
    }, 10);
    
    if (window.innerWidth < 640) {
      scrollPosition = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = "hidden"; // Prevent body scroll on mobile
    } else {
      mainContent.style.paddingRight = "450px"; // Push content on desktop
    }
  }

  function closePanel() {
    copilotPanel.classList.add("translate-x-full");
    // Revert push on desktop
    if (window.innerWidth >= 640) {
      mainContent.style.paddingRight = "0px";
    }
    
    if (window.innerWidth < 640) {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = ""; // Restore body scroll
      window.scrollTo(0, scrollPosition);
    }

    panelOverlay.classList.add("opacity-0");

    // Hide history if open
    if (historyView && !historyView.classList.contains("hidden")) {
      historyView.classList.add("hidden");
      historyView.classList.remove("flex");
      if (historyBtn) historyBtn.classList.remove("bg-copilot-brand/10");
    }

    setTimeout(() => {
      panelOverlay.classList.add("hidden");
    }, 300);
  }

  fabButton.addEventListener("click", openPanel);
  closeButton.addEventListener("click", closePanel);
  panelOverlay.addEventListener("click", closePanel);

  // ==========================================
  // 1. STATE & SESSION MANAGEMENT
  // ==========================================
  const session = {
    flow: null, // 'move_batch' | 'summary_multi_material' | 'summary_single_material' | 'comparison' | 'material_detail'
    state: "idle",
    context: {
      summaryType: null, // "multi_material" | "single_material"
      baseDestination: null,
      compareDestination: null,
      materialName: null,
      materialId: null,
      selectedOrigins: null,
      selectedScope: null, // base | compare | both
      topN: 10,
      snapshot: null,
      tableData: null,
      comparisonData: null,
      pendingAction: null,
      drilldown: null // Object used for phase 3: material drilldown snapshotting
    },
    // TODO (Legacy Debt): The following properties are kept temporarily for backward compatibility 
    // during the `move_batch` transition and mock data generator reliance.
    identifiedBatch: null, // move_batch
    changeScope: null, // move_batch
    newOrigin: null, // move_batch
    newDestination: null, // move_batch
    currentProposal: null, // move_batch
    // TODO (Legacy Debt): remove lastSummary when `getMockComparisonSummary` is decoupled
    lastSummary: null, 
    // TODO (Legacy Debt): remove lastTopN when mock data tables are fully decoupled
    lastTopN: 10,
  };

  function resetSession() {
    session.flow = null;
    session.state = "idle";
    session.context = {
      summaryType: null,
      baseDestination: null,
      compareDestination: null,
      materialName: null,
      materialId: null,
      selectedOrigins: null,
      selectedScope: null,
      topN: 10,
      snapshot: null,
      tableData: null,
      comparisonData: null,
      pendingAction: null,
      drilldown: null
    };
    session.identifiedBatch = null;
    session.changeScope = null;
    session.newOrigin = null;
    session.newDestination = null;
    session.currentProposal = null;
    session.lastSummary = null;
    session.lastTopN = 10;
  }

  // ==========================================
  // 2. CONSTANTS
  // ==========================================
  const FLOWS = {
    SUMMARY_SINGLE: "summary_single_material",
    SUMMARY_MULTI: "summary_multi_material",
    COMPARISON: "comparison",
    MATERIAL_DETAIL: "material_detail",
    MOVE_BATCH: "move_batch",
  };

  const STATES = {
    IDLE: "idle",
    START: "start",
    AWAITING_SUMMARY_QUERY: "awaiting_summary_query",
    AWAITING_FOLLOWUP: "awaiting_followup"
  };

  // ==========================================
  // 4. RENDERERS (UI Components)
  // ==========================================
  function renderWelcomeScreen() {
    userInput.disabled = true;
    userInput.placeholder = "Please select an option above to start...";
    userInput.classList.add("opacity-50", "cursor-not-allowed");

    chatBox.innerHTML = `
            <div id="welcome-screen" class="flex flex-col items-center justify-center pt-8 pb-4 w-full animate-fade-in-up">
                <div class="mb-6 flex justify-center items-center">
                    <img src="img/schippy-illustration.png" alt="Schippy Welcome" class="w-32 h-32 object-contain">
                </div>
                <h3 class="text-center text-[22px] font-bold text-neutral-900 leading-[1.3] mb-6 tracking-tight font-sans">Hey Mariana,<br>Welcome back. What are we working on?</h3>
                <div class="flex gap-3">
                    <button onclick="window.startMoveBatch()" class="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-2.5 rounded-lg text-sm font-normal transition-colors border border-transparent hover:border-neutral-300">Move a batch</button>
                    <button onclick="window.sendQuickReply('Give me the summary')" class="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-2.5 rounded-lg text-sm font-normal transition-colors border border-transparent hover:border-neutral-300">Give me the summary</button>
                </div>
            </div>
        `;
  }

  function renderMoveBatchHeader() {
    const header = document.createElement("div");
    header.className =
      "flex flex-col items-center justify-center pt-2 pb-0 w-full animate-fade-in-up";
    header.innerHTML = `
            <div class="mb-3 flex justify-center items-center">
                <img src="img/schippy-illustration.png" alt="Schippy" class="w-20 h-20 object-contain">
            </div>
            <h3 class="text-center text-[18px] font-bold text-neutral-900 leading-snug tracking-tight font-sans mb-4">Let's move a batch!</h3>
        `;
    chatBox.appendChild(header);
  }

  window.startMoveBatch = function () {
    userInput.disabled = false;
    userInput.placeholder = "Type your message...";
    userInput.classList.remove("opacity-50", "cursor-not-allowed");

    const welcomeScreen = document.getElementById("welcome-screen");
    if (welcomeScreen) welcomeScreen.remove();

    session.flow = "move_batch";
    session.state = "awaiting_batch_reference";

    // Remove typing indicator if any
    hideTypingIndicator();

    appendMessage(
      "Let's move a batch. I'll need a material ID, batch ID, or store location to find it. What do you have?",
      "bot",
    );
  };

  renderWelcomeScreen();

  function detectComparisonIntent(q) {
    const text = q.toLowerCase();
    return (
      text.includes("compare with") ||
      text.includes("compare to") ||
      text.includes("compare against") ||
      text.includes("vs") ||
      text.includes("versus") ||
      text.includes("another destination") ||
      text.includes("another origin") ||
      text.includes("against")
    );
  }

  function resolveKnownComparisonTarget(q) {
    const text = q.toLowerCase();
    if (text.includes("joliet")) return "Joliet";
    if (text.includes("dallas")) return "Dallas";
    if (text.includes("atlanta")) return "Atlanta";
    if (text.includes("stockton")) return "Stockton";
    if (text.includes("carlisle")) return "Carlisle";
    return null;
  }

  // ==========================================
  // 5. INPUT ROUTER & NLP UTILS
  // ==========================================
  function extractSummaryContext(text) {
    const lowerText = text.toLowerCase();

    // Mock NLP Extraction logic for Scenario 1 (Gatorade to Carlisle)
    const hasGatorade = lowerText.includes("gatorade") || lowerText.includes("010052000052814000");
    const hasCarlisle = lowerText.includes("carlisle") || lowerText.includes("3442");
    
    if (hasGatorade && hasCarlisle) {
      return {
        materialName: "Gatorade Fruit Punch",
        materialId: "010052000052814000",
        destination: "3442 (Carlisle Service Center)",
        shortDest: "Carlisle",
        origins: ["3389 - Indianapolis SVC CTR", "3227 - Cedar Rapids IA", "4040 - Lakeland SVC CTR"],
        tableRows: [
          {
            origin: "3389 — Indianapol<br>SVC CTR",
            cases: "3,595",
            pallets: "42",
            trucks: "1.5",
            weight: "74 800",
          },
          {
            origin: "3227 — Cedar<br>Rapids IA",
            cases: "3,595",
            pallets: "42",
            trucks: "1.5",
            weight: "74 800",
          },
          {
            origin: "4040 — Lakeland<br>SVC CTR",
            cases: "1,010",
            pallets: "12",
            trucks: "0.5",
            weight: "25,100",
          },
        ],
        totalCases: "8,200",
        totalWeight: "174,700",
        forecast: "8,000",
        variance: "+200 CS (+2.5%)",
        varianceClass: "text-error-700",
      };
    }

    // Mock NLP Extraction logic for Scenario 2 (Pepsi to Dallas)
    const hasPepsi = lowerText.includes("pepsi") || lowerText.includes("02001234567890001");
    const hasDallas = lowerText.includes("dallas") || lowerText.includes("4001");
    
    if (hasPepsi && hasDallas) {
      return {
        materialName: "Pepsi Zero Sugar 12pk",
        materialId: "02001234567890001",
        destination: "4001 (Dallas Distribution Center)",
        shortDest: "Dallas",
        origins: ["Austin 1122", "Houston 3344"],
        tableRows: [
          {
            origin: "1122 — Austin<br>SVC CTR",
            cases: "2,000",
            pallets: "24",
            trucks: "1.0",
            weight: "42,000",
          },
          {
            origin: "3344 — Houston<br>DC",
            cases: "1,500",
            pallets: "18",
            trucks: "0.8",
            weight: "31,500",
          },
        ],
        totalCases: "3,500",
        totalWeight: "73,500",
        forecast: "3,600",
        variance: "-100 CS (-2.7%)",
        varianceClass: "text-success-700",
      };
    }

    return null; // Fallback to legacy logic if no context matches
  }

  // ==========================================
  // 3. SCHIPPY ENGINE (State Machine)
  // ==========================================
  const SCHIPPY_ENGINE = {
    flows: {
      // ------------------------------------------
      // Flow: Single Material Summary
      // Purpose: Detailed route breakdown for a specific material and destination.
      // Triggered via: "Gatorade to Carlisle"
      // ------------------------------------------
      [FLOWS.SUMMARY_SINGLE]: {
        start: {
          botMessage: (ctx) =>
            `Got it — checking <strong>${ctx.materialName} (${ctx.materialId})</strong> to <strong>${ctx.destination}</strong>.<br><br>Multiple plants ship this product to ${ctx.shortDest}.<br><br>Would you like a summary for all origins, or pick specific ones?`,
          quickReplies: (ctx) => ["All origins", ...ctx.origins],
          onInput: (text, ctx) => {
            const lowerText = text.toLowerCase();
            if (lowerText.includes("all origins") || lowerText.includes("all plants")) {
              session.context.selectedOrigin = "all";
              return "show_all_origins_table";
            }
            const selected = ctx.origins.find(o => lowerText.includes(o.split(" ")[0].toLowerCase()));
            if (selected) {
              session.context.selectedOrigin = selected;
              return "show_all_origins_table";
            }
            return "show_all_origins_table"; // Fallback to happy path for demo
          },
        },
        show_all_origins_table: {
          botMessage: (ctx) =>
            `Summary — Destination: <strong>${ctx.shortDest}</strong><br>Material: <strong>${ctx.materialName}<br>(${ctx.materialId})</strong>`,
          renderComponent: "dynamicSummaryTable",
          quickReplies: (ctx) => [
            `Compare ${ctx.shortDest} vs other for this material`,
            "Export this summary",
            "Done"
          ],
          onInput: (text, ctx) => {
            if (text.includes("compare")) {
              // Bridge back to comparison state machine
              session.flow = "comparison";
              session.state = "awaiting_comparison_target";
              // Migrate context gracefully
              session.context.summaryType = "single_material";
              session.context.baseDestination = ctx.shortDest;
              session.context.materialName = ctx.materialName;
              session.context.materialId = ctx.materialId;
              
              // Legacy bridge
              session.lastSummary = {
                targetName: ctx.shortDest,
                targetType: "destination",
                title: `Comparison for ${ctx.materialName}`,
                materialContext: ctx.materialName,
              };
              appendMessage(
                `Which destination or origin would you like to compare with ${ctx.shortDest}?`,
                "bot",
              );
              prefillInput("Dallas");
              return null; // Let the interceptor route it next time
            }
            if (text.includes("export")) {
              handleExport("summary_single", ctx);
              return null;
            }
            if (text.includes("done")) {
              appendMessage("Great! What would you like to do next?", "bot");
              resetSession();
              return null;
            }
            return null;
          },
        },
      },
      // ------------------------------------------
      // Flow: Multi-Material Summary
      // Purpose: High-level overview of a destination and its top contributing materials.
      // Triggered via: "Summarize Carlisle"
      // ------------------------------------------
      [FLOWS.SUMMARY_MULTI]: {
        awaiting_detail_choice: {
          renderComponent: "summarySnapshot",
          botMessage: (ctx) =>
            `What would you like to do with the summary for ${ctx.baseDestination}?`,
          quickReplies: [
            "Show top 10",
            "Show top 20",
            "Export store summary",
            "Compare with another destination",
          ],
          onInput: (text, ctx) => {
            const lowerText = text.toLowerCase();
            if (lowerText.includes("top 10")) {
              ctx.topN = 10;
              return "showing_top_materials_table";
            }
            if (lowerText.includes("top 20")) {
              ctx.topN = 20;
              return "showing_top_materials_table";
            }
            if (lowerText.includes("export")) {
              handleExport("summary_multi", ctx);
              return "awaiting_followup";
            }
            if (lowerText.includes("compare")) {
              session.flow = "comparison";
              session.state = "awaiting_comparison_target";
              appendMessage(
                `Which destination or origin would you like to compare with ${ctx.baseDestination}?`,
                "bot"
              );
              prefillInput("Dallas");
              return null;
            }
            return null;
          },
        },
        showing_top_materials_table: {
          botMessage: (ctx) =>
            `Pulling top ${ctx.topN} materials for ${ctx.baseDestination}...`,
          renderComponent: "topMaterialsTable",
          quickReplies: [
            "Show more materials",
            "Export store summary",
            "Compare with another destination",
          ],
          onInput: (text, ctx) => {
            const lowerText = text.toLowerCase();
            if (lowerText.includes("more")) {
              ctx.topN += 10;
              return "showing_top_materials_table";
            }
            if (lowerText.includes("export")) {
              handleExport("summary_multi", ctx);
              return "awaiting_followup";
            }
            if (lowerText.includes("compare")) {
              session.flow = "comparison";
              session.state = "awaiting_comparison_target";
              appendMessage(
                `Which destination or origin would you like to compare with ${ctx.baseDestination}?`,
                "bot"
              );
              prefillInput("Dallas");
              return null;
            }
            return null;
          },
        },
        awaiting_followup: {
          botMessage: "We are still viewing the summary. What would you like to do next?",
          quickReplies: [
            "Compare with another destination",
            "Show more materials",
            "Done",
          ],
          onInput: (text, ctx) => {
            const lowerText = text.toLowerCase();
            if (lowerText.includes("compare")) {
              session.flow = "comparison";
              session.state = "awaiting_comparison_target";
              appendMessage(
                `Which destination or origin would you like to compare with ${ctx.baseDestination}?`,
                "bot"
              );
              prefillInput("Dallas");
              return null;
            }
            if (lowerText.includes("more")) {
              ctx.topN += 10;
              return "showing_top_materials_table";
            }
            if (lowerText.includes("done")) {
              appendMessage("Great! What would you like to do next?", "bot");
              resetSession();
              return null;
            }
            return null;
          },
        },
      },
      // ------------------------------------------
      // Flow: Comparison
      // Purpose: Compare two destinations/origins (overall volume or specific material).
      // Triggered via: "Compare with..." quick replies from single or multi summary.
      // ------------------------------------------
      [FLOWS.COMPARISON]: {
        awaiting_comparison_target: {
          botMessage: null, // Message generated dynamically before entering state or via bridge
          onInput: (text, ctx) => {
            const targetName = text.toLowerCase().includes("joliet")
              ? "Joliet" : text.toLowerCase().includes("dallas")
              ? "Dallas" : text.toLowerCase().includes("atlanta")
              ? "Atlanta" : text.toLowerCase().includes("stockton")
              ? "Stockton" : null;

            if (!targetName) {
              appendMessage("That destination is not currently supported for comparison. Try another destination, or you can export the current summary.", "bot");
              prefillInput("Dallas");
              return null; // Stay in this state
            }

            // Generate mock data
            // Use legacy lastSummary bridge for now as requested
            const baseSummary = session.lastSummary || { targetName: ctx.baseDestination };
            const compData = getMockComparisonSummary(baseSummary, targetName);
            
            // Store explicitly in context
            ctx.comparisonData = {
               ...compData,
               originatingFlow: ctx.summaryType === "single_material" ? "summary_single_material" : "summary_multi_material"
            };

            return "showing_comparison_card";
          }
        },
        showing_comparison_card: {
          renderComponent: "comparisonCard",
          quickReplies: (ctx) => {
             const isSingle = ctx.comparisonData?.originatingFlow === "summary_single_material";
             return isSingle 
               ? ["Export comparison", "Compare with another destination", "Back to summary", "Done"]
               : ["Export comparison", "Compare with another location", "Show top materials", "Back to summary"];
          },
          onInput: (text, ctx) => {
            const lowerText = text.toLowerCase();
            if (lowerText.includes("export")) {
              handleExport("comparison", ctx);
              return null; // Stay in same visual state, just export
            }
            if (lowerText.includes("compare")) {
              appendMessage(`Which destination or origin would you like to compare with ${ctx.comparisonData.base.name}?`, "bot");
              prefillInput("Dallas");
              return "awaiting_comparison_target";
            }
            if (lowerText.includes("back") || lowerText.includes("summary")) {
              const origFlow = ctx.comparisonData?.originatingFlow || "summary_multi_material";
              session.flow = origFlow;
              if (origFlow === "summary_single_material") {
                 appendMessage("We are back to the main summary view. What else would you like to explore?", "bot");
                 return "show_all_origins_table";
              } else {
                 appendMessage("We are back to the main summary view. What else would you like to explore?", "bot");
                 prefillInput("Total weight");
                 return "awaiting_followup";
              }
            }
            if (lowerText.includes("done")) {
              appendMessage("Great! What would you like to do next?", "bot");
              resetSession();
              return null;
            }
            if (lowerText.includes("top materials")) {
              appendMessage(`Would you like to see top materials for ${ctx.comparisonData.base.name}, ${ctx.comparisonData.compare.name}, or both?`, "bot");
              prefillInput("Both");
              return "awaiting_comparison_material_scope";
            }
            return null;
          }
        },
        awaiting_comparison_material_scope: {
           quickReplies: (ctx) => [ctx.comparisonData.base.name, ctx.comparisonData.compare.name, "Both"],
           onInput: (text, ctx) => {
             const lowerText = text.toLowerCase();
             const baseName = ctx.comparisonData.base.name;
             const compName = ctx.comparisonData.compare.name;

             const exactBaseMatch = new RegExp(`\\b${baseName.toLowerCase()}\\b`, "i").test(lowerText);
             const exactCompMatch = new RegExp(`\\b${compName.toLowerCase()}\\b`, "i").test(lowerText);
             const exactBothMatch = /\bboth\b/i.test(lowerText);

             if (exactBothMatch) {
               ctx.selectedScope = "both";
               return "showing_top_materials_table";
             }
             if (exactBaseMatch && !exactCompMatch) {
               ctx.selectedScope = "base";
               return "showing_top_materials_table";
             }
             if (exactCompMatch && !exactBaseMatch) {
               ctx.selectedScope = "compare";
               return "showing_top_materials_table";
             }
             
             appendMessage(`Please specify by explicitly saying ${baseName}, ${compName}, or both.`, "bot");
             prefillInput("Both");
             return null;
           }
        },
        showing_top_materials_table: {
           renderComponent: "comparisonTopMaterials",
           quickReplies: ["Export comparison", "Compare with another destination", "Back to summary"],
           onInput: (text, ctx) => {
             const lowerText = text.toLowerCase();
             if (lowerText.includes("export")) {
               handleExport("comparison", ctx);
               return null;
             }
             if (lowerText.includes("compare")) {
               appendMessage(`Which destination or origin would you like to compare with ${ctx.comparisonData.base.name}?`, "bot");
               prefillInput("Dallas");
               return "awaiting_comparison_target";
             }
             if (lowerText.includes("back") || lowerText.includes("summary")) {
               const origFlow = ctx.comparisonData?.originatingFlow || "summary_multi_material";
               session.flow = origFlow;
               appendMessage("We are back to the main summary view. What else would you like to explore?", "bot");
               return origFlow === "summary_single_material" ? "show_all_origins_table" : "awaiting_followup";
             }
             return null;
           }
        }
      },
      // ------------------------------------------
      // Flow: Material Detail Drill-down
      // Purpose: View origin-level breakdown of a specific material row.
      // Triggered via: Row click on Top Materials table.
      // Context: Pushes parent flow to stack so 'Back' returns safely.
      // ------------------------------------------
      [FLOWS.MATERIAL_DETAIL]: {
        start: {
          botMessage: (ctx) => {
            const dest = ctx.baseDestination || ctx.comparisonData?.base?.name || "the current destination";
            return `Here is the route breakdown for <strong>${ctx.drilldown.materialName}</strong> at <strong>${dest}</strong>.`;
          },
          renderComponent: "materialDrilldownCard",
          quickReplies: ["Compare", "Export", "Back"],
          onInput: (text, ctx) => {
            const lowerText = text.toLowerCase();
            if (lowerText.includes("export")) {
              handleExport("summary_single", ctx);
              return null; // Stay in same state
            }
            if (lowerText.includes("compare")) {
              // Set up comparison context seamlessly without relying directly on lastSummary
              session.context.summaryType = "single_material";
              session.context.materialName = ctx.drilldown.materialName;
              session.context.materialId = ctx.drilldown.materialId;
              session.context.baseDestination = ctx.baseDestination || ctx.comparisonData?.base?.name || "Carlisle";

              // Legacy bridge fallback, keeping it lightweight
              session.lastSummary = {
                targetName: session.context.baseDestination,
                targetType: "destination",
                title: `Comparison for ${session.context.materialName}`,
                materialContext: session.context.materialName,
              };

              session.flow = "comparison";
              session.state = "awaiting_comparison_target";
              appendMessage(`Which destination or origin would you like to compare with ${session.context.baseDestination}?`, "bot");
              prefillInput("Joliet");
              return;
            }
            if (lowerText.includes("back") || lowerText.includes("summary")) {
              // Restore parent flow context and state exactly
              const snapshot = ctx.drilldown.parentContextSnapshot;
              const pFlow = ctx.drilldown.parentFlow;
              const pState = ctx.drilldown.parentState;

              session.context = snapshot;
              session.flow = pFlow;
              session.state = pState;
              
              // No need to append a new message here if we are just re-rendering the table,
              // but we can append a gentle "back" acknowledgement if desired.
              appendMessage("Going back to the previous view...", "bot");
              executeFlowStep(session.flow, session.state);
              return; // We transition out entirely
            }
            
            return null;
          }
        }
      },
      [FLOWS.MOVE_BATCH]: {
        // TODO (Legacy Debt): Migrate legacy move_batch block into SCHIPPY_ENGINE here
      }
    }
  };

  function executeFlowStep(flowId, stateId) {
    const step = SCHIPPY_ENGINE.flows[flowId]?.[stateId];
    if (!step) {
      console.warn(`[SCHIPPY_ENGINE] Invalid transition: Flow '${flowId}' or State '${stateId}' does not exist.`);
      return;
    }
    const ctx = session.context;

    if (step.botMessage) {
      const msg =
        typeof step.botMessage === "function"
          ? step.botMessage(ctx)
          : step.botMessage;
      appendMessage(msg, "bot");
    }

    if (step.renderComponent === "dynamicSummaryTable") {
      renderDynamicSummaryTable(ctx);
    } else if (step.renderComponent === "summarySnapshot") {
      renderSummarySnapshot(ctx.summarySnapshot);
    } else if (step.renderComponent === "topMaterialsTable") {
      renderTopMaterialsTable(ctx.baseDestination, ctx.topN);
      session.lastTopN = ctx.topN; // Sync legacy topN
    } else if (step.renderComponent === "comparisonCard") {
      renderComparisonCard(ctx.comparisonData);
    } else if (step.renderComponent === "comparisonTopMaterials") {
      renderComparisonTopMaterials(ctx.comparisonData.base.name, ctx.comparisonData.compare.name, ctx.selectedScope);
    } else if (step.renderComponent === "materialDrilldownCard") {
      renderMaterialDrilldownCard(ctx);
    }

    if (step.quickReplies) {
      const replies =
        typeof step.quickReplies === "function"
          ? step.quickReplies(ctx)
          : step.quickReplies;
      if (replies && replies.length > 0) {
        let btnsHTML = `<div class="mt-4 flex flex-wrap gap-2.5 sm:gap-2">`;
        replies.forEach((btn) => {
          btnsHTML += `<button onclick="window.sendQuickReply('${btn}')" class="quick-reply-btn rounded-full border border-neutral-200 px-4 py-2 sm:py-1.5 text-[13px] sm:text-[12px] font-normal text-neutral-700 bg-white hover:bg-neutral-50 transition-colors shadow-sm active:bg-neutral-100">${btn}</button>`;
        });
        btnsHTML += `</div>`;
        appendMessage(btnsHTML, "bot");
      }
    }

    scrollToBottom();
  }

  function renderDynamicSummaryTable(ctx) {
    let filteredRows = ctx.tableRows;
    let isSpecificOrigin = ctx.selectedOrigin && ctx.selectedOrigin !== "all";

    if (isSpecificOrigin) {
      const originPrefix = ctx.selectedOrigin.split(" ")[0]; // e.g. "3389"
      filteredRows = ctx.tableRows.filter((r) => r.origin.includes(originPrefix));
    }

    let currentTotalCases = 0;
    let currentTotalWeightStr = ctx.totalWeight;

    if (isSpecificOrigin) {
      filteredRows.forEach((row) => {
         currentTotalCases += parseInt(row.cases.replace(/,/g, ""), 10);
      });
      // Just take the weight of the first row for specific origin for demo simplicity
      if (filteredRows.length > 0) {
         currentTotalWeightStr = filteredRows[0].weight;
      }
    } else {
      currentTotalCases = ctx.totalCases;
    }
    
    const displayCases = isSpecificOrigin ? currentTotalCases.toLocaleString() : ctx.totalCases;

    let rowsHtml = "";
    filteredRows.forEach((row) => {
      rowsHtml += `
                <tr class="border-b border-neutral-100">
                    <td class="py-2 pr-3 font-medium text-neutral-900 leading-tight">${row.origin}</td>
                    <td class="py-2 pr-3 text-neutral-700 text-right">${row.cases}</td>
                    <td class="py-2 pr-3 text-neutral-700 text-right">${row.pallets}</td>
                    <td class="py-2 pr-3 text-neutral-700 text-right">${row.trucks}</td>
                    <td class="py-2 text-neutral-700 text-right">${row.weight}</td>
                </tr>
            `;
    });

    const html = `
            <div class="mt-3 rounded-[8px] border border-neutral-200 bg-white shadow-sm overflow-hidden mb-4 relative">
                <div class="absolute top-0 left-0 w-full h-1 bg-copilot-brand opacity-80"></div>
                <div class="p-4 overflow-x-auto scrollbar-hide">
                    <table class="w-full text-left text-[12px] border-collapse min-w-[500px]">
                        <thead>
                            <tr class="border-b border-neutral-200 text-neutral-900 font-bold">
                                <th class="py-2 pr-3">Origin Plant</th>
                                <th class="py-2 pr-3 text-right">Cases</th>
                                <th class="py-2 pr-3 text-right">Pallets</th>
                                <th class="py-2 pr-3 text-right">Trucks</th>
                                <th class="py-2 text-right">Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowsHtml}
                            <tr class="border-t-2 border-neutral-200">
                                <td class="py-2 pr-3 font-bold text-neutral-900">Total → ${ctx.shortDest}</td>
                                <td class="py-2 pr-3 font-bold text-neutral-900 text-right">${displayCases} CS</td>
                                <td class="py-2 pr-3 text-neutral-500 text-right">--</td>
                                <td class="py-2 pr-3 text-neutral-500 text-right">--</td>
                                <td class="py-2 font-bold text-neutral-900 text-right">${currentTotalWeightStr} lbs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="flex items-start gap-3 w-full animate-fade-in-up font-sans mt-4">
                <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 overflow-hidden bg-neutral-100 border border-neutral-200">
                    <img src="img/schippy-avatar.png" alt="Schippy" class="w-full h-full object-cover">
                </div>
                <div class="text-[13px] text-neutral-900 w-full leading-[1.6] pt-[3px] font-sans">
                    <p>Forecast for ${ctx.shortDest}: <strong>${ctx.forecast} CS</strong></p>
                    <p>Actual total: <strong>${displayCases} CS</strong></p>
                    <p>Variance vs forecast: <strong class="text-neutral-900">${ctx.variance}</strong></p>
                    <p class="text-neutral-900 mt-1 mb-4">Data source: Aging → STO (current view, refreshed just now).</p>
                    <p>Would you like to: Compare ${ctx.shortDest} vs other for this material?</p>
                </div>
            </div>
        `;

    const div = document.createElement("div");
    div.className =
      "w-full animate-fade-in-up font-sans mt-2 mb-2 pr-2 pl-[40px]"; // indented to align with message
    div.innerHTML = html;
    document.getElementById("chat-box").appendChild(div);
    if (window.lucide) lucide.createIcons();
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, "user");
    processInput(text);
    userInput.value = "";
  });

  // Ensure scroll is fixed when mobile keyboard opens
  userInput.addEventListener("focus", () => {
    setTimeout(() => {
      scrollToBottom();
    }, 300);
  });

  window.sendQuickReply = function (text) {
    userInput.disabled = false;
    userInput.placeholder = "Type your message...";
    userInput.classList.remove("opacity-50", "cursor-not-allowed");

    document
      .querySelectorAll(".quick-reply-btn")
      .forEach((btn) => btn.classList.add("hidden"));

    appendMessage(text, "user");
    processInput(text);
  };

  window.triggerSilentAction = function (actionText) {
    processInput(actionText);
  };

  // ==========================================
  // 6. MAIN INPUT ROUTER (`processInput`)
  // ==========================================
  function processInput(text) {
    const lowerText = text.toLowerCase();
    showTypingIndicator();

    setTimeout(() => {
      hideTypingIndicator();

      // Global Prototype Guardrails: Cancel vs Restart
      if (["start over", "restart", "back to start"].includes(lowerText)) {
        resetSession();
        renderWelcomeScreen(); // Wipes chat history and shows the initial welcome screen
        return;
      }

      if (session.state !== STATES.IDLE) {
        if (lowerText === "cancel") {
          appendMessage(
            "Got it, I've cancelled that. Your routing is safe and unchanged. What's next?",
            "bot",
          );
          resetSession();
          scrollToBottom();
          return;
        }
      }

      const welcomeScreen = document.getElementById("welcome-screen");

      // DRILL-DOWN INTERCEPTOR (Phase 3)
      if (text.startsWith("VIEW_MATERIAL_DETAIL|")) {
        // Ensure it's only triggered from valid table states
        const isValidTriggerState =
          session.state === "showing_top_materials_table" &&
          (session.flow === FLOWS.SUMMARY_MULTI || session.flow === FLOWS.COMPARISON);

        if (isValidTriggerState) {
          const parts = text.split("|");
          const materialId = parts[1];
          const materialName = parts[2];

          session.context.drilldown = {
            materialId: materialId,
            materialName: materialName,
            parentFlow: session.flow,
            parentState: session.state,
            parentContextSnapshot: JSON.parse(JSON.stringify(session.context))
          };

          session.flow = FLOWS.MATERIAL_DETAIL;
          session.state = "start";
          executeFlowStep(session.flow, session.state);
          return;
        } else {
          // If clicked out of bounds, just ignore safely
          console.warn(`[SCHIPPY_ENGINE] Drill-down triggered outside of allowed states. Current flow: ${session.flow}, state: ${session.state}`);
          return;
        }
      }

      // FLOW ENGINE INTERCEPTOR WITH DYNAMIC EXTRACTOR
      // Can be triggered from idle or awaiting_summary_query
      if (session.state === STATES.IDLE || session.state === STATES.AWAITING_SUMMARY_QUERY) {
        const extractedCtx = extractSummaryContext(lowerText);
        if (extractedCtx) {
          if (welcomeScreen) welcomeScreen.remove();
          session.context = { ...session.context, ...extractedCtx }; // Merge
          session.flow = FLOWS.SUMMARY_SINGLE;
          session.state = STATES.START;
          executeFlowStep(session.flow, session.state);
          return;
        }

        const hasDest = lowerText.includes("carlisle") || lowerText.includes("joliet") || lowerText.includes("tracy");
        const hasSummaryIntent = detectSummaryIntent(lowerText);
        
        if (session.state === STATES.AWAITING_SUMMARY_QUERY || (session.state === STATES.IDLE && hasSummaryIntent && hasDest)) {
          if (welcomeScreen) welcomeScreen.remove();
          const destination = detectDestinationFromInput(lowerText);
          
          session.context.summaryType = "multi_material";
          session.context.baseDestination = destination;
          session.context.topN = 10;
          
          // Contextual snapshot data replacing currentSummary
          session.context.summarySnapshot = {
            destination: destination,
            totalCases: "8,200 CS",
            totalValue: "+$174,700",
            activeOrigins: "3",
            forecast: "8,000 CS",
            variance: "+200 CS (+2.5%)"
          };
          
          // Keep legacy bridge for comparison fallback
          // TODO (Legacy Debt): remove lastSummary when decoupling comparison
          session.lastSummary = {
            targetName: destination,
            targetType: "destination",
            title: "Total Cases by Origin"
          };
          
          session.flow = FLOWS.SUMMARY_MULTI;
          session.state = "awaiting_detail_choice";
          executeFlowStep(session.flow, session.state);
          return;
        }
      }

      // If we are currently inside a config-driven flow
      if (
        session.flow &&
        session.flow !== FLOWS.MOVE_BATCH && // Explicitly exclude the unmigrated flow
        SCHIPPY_ENGINE.flows[session.flow] &&
        session.state !== STATES.IDLE
      ) {
        const currentStep = SCHIPPY_ENGINE.flows[session.flow][session.state];
        if (!currentStep) {
          console.warn(`[SCHIPPY_ENGINE] Missing state definition for ${session.state} in flow ${session.flow}`);
          return;
        }

        if (currentStep && currentStep.onInput) {
          const nextState = currentStep.onInput(lowerText, session.context);
          if (nextState) {
            session.state = nextState;
            executeFlowStep(session.flow, session.state);
            return;
          }
        }
      }

      if (session.state === STATES.IDLE) {
        if (welcomeScreen) welcomeScreen.remove();

        if (lowerText.includes("move") || lowerText.includes("batch")) {
          session.flow = FLOWS.MOVE_BATCH;
          session.state = "awaiting_batch_reference";
          appendMessage(
            "Let's move a batch. I'll need a material ID, batch ID, or store location to find it. What do you have?",
            "bot",
          );
        } else if (
          lowerText.includes("summary") ||
          lowerText.includes("report")
        ) {
          session.flow = "summary_query";
          session.state = STATES.AWAITING_SUMMARY_QUERY;
          appendMessage(
            "Let's pull some data. I can show you a summary by destination, origin, or material—or compare two locations. What are we looking at?",
            "bot",
          );
          prefillInput("Summarize Carlisle");
        } else {
          appendMessage(
            "I didn't quite catch that. I'm Schippy—I help with batch movements, route analysis, and network summaries. What are we working on today?",
            "bot",
          );
        }
      } else if (session.state === "awaiting_batch_reference") {
        // ==========================================
        // 7. LEGACY MOVE BATCH FLOW
        // TODO (Legacy Debt): Migrate this block into SCHIPPY_ENGINE
        // ==========================================
        // Any input is accepted for prototype
        session.identifiedBatch = {
          materialId: "010052000052814000",
          batchId: "071124GP",
          origin: "3389 (Beverage Indianapolis SVC CTR)",
          destination: "3442 (PCNA Carlisle Service Center)",
          weight: "81,700 lbs",
        };
        session.state = "awaiting_batch_confirmation";
        appendMessage(
          `Found it. Let me confirm the details before we move forward:<br><strong>Batch Gatorade moving: 3389 ➔ 3442</strong><br>Material ID: <strong>${session.identifiedBatch.materialId}</strong><br>Batch: <strong>${session.identifiedBatch.batchId}</strong><br>Origin Plant: <strong>${session.identifiedBatch.origin}</strong><br>Current Destination: <strong>${session.identifiedBatch.destination}</strong><br>Weight: <strong>${session.identifiedBatch.weight}</strong><br>Does this look right?`,
          "bot",
        );
        prefillInput("Yes");
      } else if (session.state === "awaiting_batch_confirmation") {
        if (lowerText.includes("yes")) {
          session.state = "awaiting_change_scope";
          appendMessage(
            "Good. Are we changing the origin, destination, or both?",
            "bot",
          );
          prefillInput("Both");
        } else if (lowerText.includes("no")) {
          session.state = "awaiting_batch_reference";
          appendMessage(
            "Okay, let's try again. Please provide a material ID, batch ID, or store location.",
            "bot",
          );
        } else {
          appendMessage(
            "Please answer Yes or No to confirm the batch details.",
            "bot",
          );
          prefillInput("Yes");
        }
      } else if (session.state === "awaiting_change_scope") {
        if (lowerText.includes("origin") && !lowerText.includes("both")) {
          session.changeScope = "origin";
          session.state = "awaiting_new_origin";
          appendMessage("Where should this go instead?", "bot");
          prefillInput("4040 — Gatorade DC Lakeland SVC CTR (FL)");
        } else if (
          lowerText.includes("destination") &&
          !lowerText.includes("both")
        ) {
          session.changeScope = "destination";
          session.state = "awaiting_new_destination";
          appendMessage("What's the new destination?", "bot");
          prefillInput("3944 — Quaker DC Lancaster TX");
        } else if (lowerText.includes("both")) {
          session.changeScope = "both";
          session.state = "awaiting_new_origin_and_destination";
          appendMessage("Where should this go instead?", "bot");
          prefillInput("4040 — Gatorade DC Lakeland SVC CTR (FL)");
        } else {
          appendMessage(
            "Just to be clear—are we changing the origin, destination, or both?",
            "bot",
          );
          prefillInput("Both");
        }
      } else if (session.state === "awaiting_new_origin") {
        if (text.length < 3) {
          appendMessage(
            "I need a valid location code or name. Can you provide that?",
            "bot",
          );
          return;
        }
        session.newOrigin = text;
        session.state = "analyzing_proposal";
        triggerAnalysis();
      } else if (session.state === "awaiting_new_destination") {
        if (text.length < 3) {
          appendMessage(
            "I need a valid location code or name. Can you provide that?",
            "bot",
          );
          return;
        }
        session.newDestination = text;
        session.state = "analyzing_proposal";
        triggerAnalysis();
      } else if (session.state === "awaiting_new_origin_and_destination") {
        if (text.length < 3) {
          appendMessage("I need a valid location code or name. Can you provide that?", "bot");
          return;
        }
        if (!session.newOrigin) {
          session.newOrigin = text;
          appendMessage("What's the new destination?", "bot");
          prefillInput("3944 — Quaker DC Lancaster TX");
        } else {
          session.newDestination = text;
          session.state = "analyzing_proposal";
          triggerAnalysis();
        }
      } else if (session.state === "awaiting_apply_decision") {
        if (
          lowerText.includes("yes") ||
          lowerText.includes("make") ||
          lowerText.includes("apply")
        ) {
          session.state = "applying_changes";
          appendMessage("Perfect. I'm rerouting this batch in the system now...", "bot");

          setTimeout(() => {
            renderSummaryAndApply();
            session.state = "awaiting_final_acknowledgement";
          }, 2000);
        } else if (
          lowerText.includes("no") ||
          lowerText.includes("don") ||
          lowerText.includes("cancel")
        ) {
          session.state = "cancelled_no_change";
          appendMessage(
            `No problem. I'm leaving this batch as-is—your current routing stays intact. Want to try a different route, or move on to something else?`,
            "bot",
          );
        } else {
          appendMessage("The net benefit is [X]. Want to lock this in, or explore another route?", "bot");
          prefillInput("Yes");
        }
      } else if (session.state === "awaiting_final_acknowledgement") {
        appendMessage(
          "Done. The batch is now rerouted. What's next—move another batch, check a summary, or compare this route against something else?",
          "bot",
        );
        session.state = "completed";
      } else if (
        session.state === "completed" ||
        session.state === "cancelled_no_change"
      ) {
        appendMessage(
          "All done there. Want to move another batch, or should we pull some data?",
          "bot",
        );
        resetSession();
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
      costImpact: "$150 (~5%)",
    };

    const shortOrig = batch.origin.split(" ")[0];
    const shortDest = batch.destination.split(" ")[0];

    if (scope === "origin") {
      const shortNewO = newO.split(" ")[0];
      proposal.proposedRouteText = `${shortNewO} → ${shortDest}`;
      proposal.currentRouteHeader =
        "Current origin:<br><span class='font-normal text-neutral-600'>" +
        batch.origin +
        "</span>";
      proposal.proposedRouteHeader =
        "Proposed origin:<br><span class='font-normal text-neutral-600'>" +
        newO +
        "</span>";
      proposal.recommendation =
        "Apply the new origin configuration — it reduces source-side handling pressure and lowers cost while keeping cases stable.";
      proposal.impactNote =
        "Destination unchanged. Recommended due to better origin availability.";
      proposal.netBenefit = "+ $360";
    } else if (scope === "destination") {
      const shortNewD = newD.split(" ")[0];
      proposal.proposedRouteText = `${shortOrig} → ${shortNewD}`;
      proposal.currentRouteHeader =
        "Current destination:<br><span class='font-normal text-neutral-600'>" +
        batch.destination +
        "</span>";
      proposal.proposedRouteHeader =
        "Proposed destination:<br><span class='font-normal text-neutral-600'>" +
        newD +
        "</span>";
      proposal.recommendation =
        "Apply the rerouting — it improves destination alignment and lowers transportation cost.";
      proposal.impactNote =
        "Origin unchanged. Recommended due to better downstream fit.";
      proposal.netBenefit = "+ $280";
      proposal.costProposed = "$2,920";
      proposal.costImpact = "$280 (~8%)";
    } else {
      const shortNewO = newO.split(" ")[0];
      const shortNewD = newD.split(" ")[0];
      proposal.proposedRouteText = `${shortNewO} → ${shortNewD}`;
      proposal.currentRouteHeader =
        "Current route:<br><span class='font-normal text-neutral-600'>" +
        batch.origin +
        " → " +
        batch.destination +
        "</span>";
      proposal.proposedRouteHeader =
        "Proposed route:<br><span class='font-normal text-neutral-600'>" +
        newO +
        " → " +
        newD +
        "</span>";
      proposal.recommendation =
        "Apply the full route adjustment — it rebalances the full batch movement path.";
      proposal.impactNote =
        "Origin and destination updated. Recommended when both ends need adjustment.";
      proposal.netBenefit = "+ $510";
      proposal.costProposed = "$2,690";
      proposal.costImpact = "$510 (~15%)";
    }
    return proposal;
  }

  function detectSummaryIntent(text) {
    return /summarize|summary|show|materials|going to/.test(text);
  }

  function detectDestinationFromInput(text) {
    if (text.includes("carlisle")) return "Carlisle";
    if (text.includes("joliet")) return "Joliet";
    if (text.includes("tracy")) return "Tracy";
    return "Carlisle"; // default
  }

  function handleExport(type, ctx) {
    let topN = session.context.topN || session.lastTopN || "all";
    let destination = session.context.baseDestination || ctx?.destination || ctx?.shortDest || "location";
    let filename = `Summary_${destination}_Top${topN}_${new Date().toISOString().split('T')[0]}.csv`;
    
    if (type === "summary_single") {
       filename = `SingleMaterial_${ctx.materialId}_${destination}_${new Date().toISOString().split('T')[0]}.csv`;
    } else if (type === "comparison") {
       filename = `Comparison_${destination}_vs_${session.context.compareDestination}_${new Date().toISOString().split('T')[0]}.csv`;
    }

    appendMessage(
      `✅ Export prepared: <strong>${filename}</strong><br>
      <a href="#" onclick="window.downloadSummary('${filename}')" class="text-copilot-brand hover:underline">Download here</a> or use your download manager.`,
      "bot"
    );
  }

  function handleExportSummary(destination) {
    handleExport("summary_multi", { destination });
  }

  window.downloadSummary = function(filename) {
    // Simular descarga (en producción, generar CSV real)
    alert(`Descargando: ${filename}`);
    // TODO: Generar CSV real del summary actual
  };

  function renderSummarySnapshot(summary) {
    const div = document.createElement("div");
    div.className =
      "flex items-start gap-3 w-full animate-fade-in-up font-sans mt-2 mb-4";

    const destination = summary.destination || "this location";
    const valueStr = summary.totalValue || "$174,700";
    let valueColorClass = "text-neutral-900";
    if (valueStr.includes("+")) {
      valueColorClass = "text-success-700";
    } else if (valueStr.includes("-")) {
      valueColorClass = "text-error-700";
    }
    
    div.innerHTML = `
      <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 overflow-hidden bg-neutral-100 border border-neutral-200">
        <img src="img/schippy-avatar.png" alt="Schippy" class="w-full h-full object-cover">
      </div>
      <div class="w-full">
        <!-- Summary Overview Card -->
        <div class="bg-white border border-neutral-200 rounded-[8px] p-4 shadow-sm mb-3 w-full relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-copilot-brand opacity-80"></div>
          
          <div class="flex items-center gap-2 mb-3">
            <div class="w-6 h-6 rounded bg-copilot-bg flex items-center justify-center text-copilot-brand">
              <i data-lucide="bar-chart-2" class="w-3.5 h-3.5"></i>
            </div>
            <h4 class="text-[12px] font-bold text-neutral-600 uppercase tracking-widest">Summary — ${destination}</h4>
          </div>
          
          <!-- 5 Key Metrics -->
          <div class="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <div>
              <p class="text-[11px] text-neutral-500 uppercase tracking-widest font-medium">Total Cases</p>
              <p class="text-[20px] font-bold text-neutral-900 mt-1">${summary.totalCases || "8,200 CS"}</p>
            </div>
            <div>
              <p class="text-[11px] text-neutral-500 uppercase tracking-widest font-medium">Mitigated Value</p>
              <p class="text-[20px] font-bold ${valueColorClass} mt-1">${valueStr}</p>
            </div>
            <div>
              <p class="text-[11px] text-neutral-500 uppercase tracking-widest font-medium">Active Origins</p>
              <p class="text-[20px] font-bold text-neutral-900 mt-1">${summary.activeOrigins || "3"}</p>
            </div>
            <div>
              <p class="text-[11px] text-neutral-500 uppercase tracking-widest font-medium">Forecast</p>
              <p class="text-[20px] font-bold text-neutral-900 mt-1">${summary.forecast || "8,000 CS"}</p>
            </div>
          </div>
          
          <!-- Variance -->
          <div class="bg-neutral-50 rounded-md p-2 border border-neutral-100">
            <p class="text-[12px] text-neutral-600">
              <strong>Variance vs forecast:</strong> ${summary.variance || "+200 CS (+2.5%)"}
            </p>
          </div>
        </div>
      </div>
    `;

    chatBox.appendChild(div);
    if (window.lucide) lucide.createIcons();
    scrollToBottom();
  }

  function getMockMaterialDrilldownData(materialId, materialName, destination) {
    // Generate some stable but mock origin-level breakdown data based on material
    const isPositive = materialName.length % 2 === 0;
    
    return {
      materialId,
      materialName,
      destination,
      origins: [
        { name: "3389 - Indianapolis", cases: "4,500 CS", weight: "82,000 lbs", mitVal: "+$12,400", variance: "+2.1%", isPositive: true },
        { name: "3227 - Cedar Rapids", cases: "3,200 CS", weight: "64,000 lbs", mitVal: "+$8,100", variance: "+1.5%", isPositive: true },
        { name: "2053 - Stockton", cases: "1,800 CS", weight: "36,000 lbs", mitVal: "$4,200", variance: "-0.8%", isPositive: false },
        { name: "4040 - Lakeland", cases: "950 CS", weight: "19,000 lbs", mitVal: "$1,850", variance: "-1.2%", isPositive: false }
      ]
    };
  }

  function getTopMaterialsData(destination, topN = 10) {
    // Datos mock para diferentes destinos
    const allMaterials = {
      carlisle: [
        { material: "Gatorade Fruit Punch 20oz", materialId: "01003495248939888", origin: "Cedar Rapids (3227)", cases: "1,590", value: "$10,640", delta: "+1.8%", deltaPositive: true },
        { material: "Gatorade Glacier Freeze 20oz", materialId: "01005200005281000", origin: "Indianapolis (3389)", cases: "1,740", value: "$11,220", delta: "+2.9%", deltaPositive: true },
        { material: "Gatorade Lemon Lime 20oz", materialId: "01005000010166001", origin: "Blue Ridge (1008)", cases: "1,820", value: "$12,480", delta: "+4.1%", deltaPositive: true },
        { material: "Gatorade Cool Blue 20oz", materialId: "01005200046458000", origin: "Lakeland (4040)", cases: "1,450", value: "$9,850", delta: "+0.5%", deltaPositive: true },
        { material: "Gatorade Orange 20oz", materialId: "00005200046458001", origin: "Memphis (2045)", cases: "1,120", value: "$7,620", delta: "-1.2%", deltaPositive: false },
        { material: "Gatorade Strawberry 20oz", materialId: "01005200006789012", origin: "Jacksonville (3340)", cases: "980", value: "$6,840", delta: "+0.3%", deltaPositive: true },
        { material: "Gatorade Watermelon 20oz", materialId: "01005200007890123", origin: "Dallas (3289)", cases: "850", value: "$5,950", delta: "-2.1%", deltaPositive: false },
        { material: "Gatorade Grape 20oz", materialId: "01005200008901234", origin: "Atlanta (3368)", cases: "720", value: "$5,040", delta: "+1.4%", deltaPositive: true },
        { material: "Gatorade Tropical 20oz", materialId: "01005200009012345", origin: "Stockton (2053)", cases: "650", value: "$4,550", delta: "+0.8%", deltaPositive: true },
        { material: "Gatorade Melon 20oz", materialId: "01005200010123456", origin: "Houston (2091)", cases: "580", value: "$4,060", delta: "-0.4%", deltaPositive: false },
        { material: "Gatorade Citrus 20oz", materialId: "01005200011234567", origin: "Phoenix (2088)", cases: "520", value: "$3,640", delta: "+2.3%", deltaPositive: true },
        { material: "Gatorade Passion Fruit", materialId: "01005200012345678", origin: "Denver (2012)", cases: "480", value: "$3,360", delta: "-0.5%", deltaPositive: false },
        { material: "Gatorade Mango 20oz", materialId: "01005200013456789", origin: "Seattle (3305)", cases: "420", value: "$2,940", delta: "+1.6%", deltaPositive: true },
        { material: "Gatorade Pineapple 20oz", materialId: "01005200014567890", origin: "Miami (3201)", cases: "380", value: "$2,660", delta: "+0.9%", deltaPositive: true },
        { material: "Gatorade Berry 20oz", materialId: "01005200015678901", origin: "LA (3260)", cases: "350", value: "$2,450", delta: "-1.8%", deltaPositive: false },
        { material: "Gatorade Punch 20oz", materialId: "01005200016789012", origin: "Chicago (2075)", cases: "320", value: "$2,240", delta: "+3.2%", deltaPositive: true },
        { material: "Gatorade Lime 20oz", materialId: "01005200017890123", origin: "Boston (3115)", cases: "290", value: "$2,030", delta: "-0.3%", deltaPositive: false },
        { material: "Gatorade Peach 20oz", materialId: "01005200018901234", origin: "Portland (3290)", cases: "270", value: "$1,890", delta: "+1.1%", deltaPositive: true },
        { material: "Gatorade Cherry 20oz", materialId: "01005200019012345", origin: "Vegas (2110)", cases: "250", value: "$1,750", delta: "+0.7%", deltaPositive: true },
        { material: "Gatorade Blueberry 20oz", materialId: "01005200020123456", origin: "San Diego (3225)", cases: "220", value: "$1,540", delta: "-2.4%", deltaPositive: false },
      ],
      joliet: [
        { material: "Pepsi Zero 12pk", materialId: "02001234567890001", origin: "Stockton (2053)", cases: "1,410", value: "$9,850", delta: "+1.4%", deltaPositive: true },
        { material: "Mountain Dew 20oz", materialId: "02009876543210002", origin: "Atlanta (3368)", cases: "1,220", value: "$8,910", delta: "-0.4%", deltaPositive: false },
        { material: "Gatorade Orange 20oz", materialId: "00005200046458000", origin: "Lakeland (4040)", cases: "1,170", value: "$8,240", delta: "+0.9%", deltaPositive: true },
        // ... agregar más si necesarios
      ],
      tracy: [
        { material: "Quaker Oats 32oz", materialId: "03001111111111111", origin: "Memphis (2045)", cases: "890", value: "$6,230", delta: "+0.5%", deltaPositive: true },
        { material: "Tropicana Orange Juice", materialId: "03002222222222222", origin: "Jacksonville (3340)", cases: "720", value: "$5,040", delta: "-1.2%", deltaPositive: false },
        { material: "Gatorade Cool Blue 20oz", materialId: "03003333333333333", origin: "Dallas (3289)", cases: "650", value: "$4,550", delta: "+0.8%", deltaPositive: true },
        // ... agregar más si necesarios
      ],
    };

    const destLower = destination.toLowerCase();
    const materials = allMaterials[destLower] || allMaterials.carlisle;
    
    // Retornar solo los primeros topN
    return materials.slice(0, topN);
  }

  function renderTopMaterialsTable(destination, topN = 10) {
    // Generar datos según destination y topN
    let tableData = getTopMaterialsData(destination, topN);
    
    const div = document.createElement("div");
    div.className =
      "flex items-start gap-3 w-full animate-fade-in-up font-sans mt-2 mb-4";

    let tableHTML = `
      <table class="w-full text-[13px] border-collapse">
        <thead>
          <tr class="bg-neutral-50 border-b border-neutral-200">
            <th class="px-3 py-2 text-left font-medium text-neutral-700">Material</th>
            <th class="px-3 py-2 text-left font-medium text-neutral-700">Material ID</th>
            <th class="px-3 py-2 text-left font-medium text-neutral-700">Top Origin</th>
            <th class="px-3 py-2 text-right font-medium text-neutral-700">Cases</th>
            <th class="px-3 py-2 text-right font-medium text-neutral-700">Mitigated Value</th>
            <th class="px-3 py-2 text-right font-medium text-neutral-700">Delta</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    tableData.forEach((row) => {
      tableHTML += `
        <tr class="border-b border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer" onclick="window.triggerSilentAction('VIEW_MATERIAL_DETAIL|${row.materialId}|${row.material}')">
          <td class="px-3 py-2 text-neutral-900 font-medium">${row.material}</td>
          <td class="px-3 py-2 text-neutral-500 font-mono text-[11px]">${row.materialId}</td>
          <td class="px-3 py-2 text-neutral-700">${row.origin}</td>
          <td class="px-3 py-2 text-right text-neutral-900 font-mono text-[12px]">${row.cases}</td>
          <td class="px-3 py-2 text-right text-neutral-900 font-mono text-[12px]">${row.value}</td>
          <td class="px-3 py-2 text-right font-mono text-[12px] ${row.deltaPositive ? "text-error-700" : "text-success-700"}">${row.delta}</td>
        </tr>
      `;
    });
    
    tableHTML += `
        </tbody>
      </table>
    `;

    div.innerHTML = `
      <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 overflow-hidden bg-neutral-100 border border-neutral-200">
        <img src="img/schippy-avatar.png" alt="Schippy" class="w-full h-full object-cover">
      </div>
      <div class="w-full">
        <div class="border border-neutral-200 rounded-[8px] overflow-hidden shadow-sm mb-3">
          ${tableHTML}
        </div>
        <p class="text-[12px] text-neutral-600 mb-2">
          Showing <strong>top ${topN} materials</strong> for ${destination} by volume.
        </p>
      </div>
    `;

    chatBox.appendChild(div);
    if (window.lucide) lucide.createIcons();
    scrollToBottom();
  }

  // ==========================================
  // 8. UTILITIES & MOCK DATA GENERATORS
  // ==========================================
  function triggerAnalysis() {
    appendMessage(
      `Let me analyze this change:
        <ul class="text-sm mb-2 pl-5">
          <li>• Checking current route constraints</li>
          <li>• Comparing lane availability</li>
          <li>• Running cost comparison</li>
        </ul>
        <span class="text-copilot-brand flex items-center gap-2 mt-3"><i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> One sec...</span>`,
      "bot",
    );

    setTimeout(() => {
      const proposal = getMockProposalByScope(
        session.changeScope,
        session.identifiedBatch,
        session.newOrigin,
        session.newDestination,
      );
      session.currentProposal = proposal;
      renderComparisonTable(proposal);
      session.state = "awaiting_apply_decision";
    }, 2000);
  }



  function getMockComparisonSummary(baseSummary, compareTarget) {
    const baseName =
      baseSummary && baseSummary.targetName
        ? baseSummary.targetName
        : "Carlisle";

    const materialName = baseSummary && baseSummary.materialContext ? baseSummary.materialContext : "All Materials";

    return {
      materialContext: materialName,
      base: {
        name: baseName,
        cases: materialName !== "All Materials" ? "8,200 CS" : "25,838 CS",
        mitigatedValue: materialName !== "All Materials" ? "$30,500" : "$91,260",
        activeOrigins: materialName !== "All Materials" ? "3" : "46",
        forecast: materialName !== "All Materials" ? "8,000 CS" : "25,600 CS",
        variance: materialName !== "All Materials" ? "+200 CS (+2.5%)" : "+238 CS (+0.9%)",
      },
      compare: {
        name: compareTarget,
        cases: materialName !== "All Materials" ? "4,100 CS" : "22,140 CS",
        mitigatedValue: materialName !== "All Materials" ? "$15,200" : "$76,880",
        activeOrigins: materialName !== "All Materials" ? "2" : "39",
        forecast: materialName !== "All Materials" ? "4,200 CS" : "22,500 CS",
        variance: materialName !== "All Materials" ? "-100 CS (-2.3%)" : "-360 CS (-1.6%)",
      },
      insight: `${baseName} is currently carrying higher volume for ${materialName} and higher mitigated value, whereas ${compareTarget} has fewer active origins.`,
    };
  }

  function renderMaterialDrilldownCard(ctx) {
    const drillData = getMockMaterialDrilldownData(
      ctx.drilldown.materialId,
      ctx.drilldown.materialName,
      ctx.baseDestination || ctx.comparisonData?.base?.name || "Carlisle"
    );

    const div = document.createElement("div");
    div.className = "bg-white font-sans mt-2 mb-4 w-full animate-fade-in-up";

    let tableRowsHtml = "";
    let mobileCardsHtml = "";
    
    drillData.origins.forEach((row) => {
      const varClass = row.isPositive ? "text-success-700" : "text-error-700";
      
      // Desktop Table Row
      tableRowsHtml += `
        <tr class="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
          <td class="py-2.5 pr-3 text-neutral-900 font-medium">${row.name}</td>
          <td class="py-2.5 pr-3 text-neutral-700 text-right font-mono text-[12px]">${row.cases}</td>
          <td class="py-2.5 pr-3 text-neutral-700 text-right font-mono text-[12px]">${row.weight}</td>
          <td class="py-2.5 pr-3 text-neutral-700 text-right font-mono text-[12px]">${row.mitVal}</td>
          <td class="py-2.5 text-right font-mono text-[12px] ${varClass}">${row.variance}</td>
        </tr>
      `;

      // Mobile Card
      mobileCardsHtml += `
        <div class="border border-neutral-100 rounded-md p-3 mb-3 last:mb-0 bg-neutral-50 shadow-sm">
          <div class="font-medium text-[13px] text-neutral-900 mb-2 border-b border-neutral-200 pb-1">${row.name}</div>
          <div class="grid grid-cols-2 gap-2 text-[12px]">
            <div class="flex flex-col"><span class="text-neutral-500 text-[10px] uppercase">Cases</span> <span class="font-mono">${row.cases}</span></div>
            <div class="flex flex-col"><span class="text-neutral-500 text-[10px] uppercase">Weight</span> <span class="font-mono">${row.weight}</span></div>
            <div class="flex flex-col"><span class="text-neutral-500 text-[10px] uppercase">Mit. Val.</span> <span class="font-mono">${row.mitVal}</span></div>
            <div class="flex flex-col"><span class="text-neutral-500 text-[10px] uppercase">Δ vs Forecast</span> <span class="font-mono ${varClass}">${row.variance}</span></div>
          </div>
        </div>
      `;
    });

    div.innerHTML = `
      <div class="rounded-[8px] border border-neutral-200 bg-white shadow-sm overflow-hidden relative">
        <div class="absolute top-0 left-0 w-full h-1 bg-copilot-brand opacity-80"></div>
        <div class="p-4">
          <div class="text-[12px] font-bold uppercase tracking-widest text-neutral-600 mb-1 mt-1">Route Breakdown</div>
          <div class="text-[13px] text-neutral-600 mb-4">
            <span class="font-medium text-neutral-900">${drillData.materialName}</span> <span class="font-mono text-[11px]">(${drillData.materialId})</span> to <span class="font-medium text-neutral-900">${drillData.destination}</span>
          </div>

          <!-- Mobile View -->
          <div class="block sm:hidden">
            ${mobileCardsHtml}
          </div>

          <!-- Desktop View -->
          <div class="hidden sm:block overflow-x-auto scrollbar-hide">
            <table class="w-full text-left text-[12px] border-collapse">
              <thead>
                <tr class="border-b border-neutral-200 text-neutral-900 font-bold">
                  <th class="py-2 pr-3 text-left">Origin</th>
                  <th class="py-2 pr-3 text-right">Cases</th>
                  <th class="py-2 pr-3 text-right">Weight</th>
                  <th class="py-2 pr-3 text-right">Mit. Val.</th>
                  <th class="py-2 text-right">Δ vs Forecast</th>
                </tr>
              </thead>
              <tbody>
                ${tableRowsHtml}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    chatBox.appendChild(div);
    scrollToBottom();
  }

  function renderComparisonCard(data) {
    const div = document.createElement("div");
    div.className =
      "flex items-start gap-3 w-full animate-fade-in-up font-sans mt-2 mb-4";

    div.innerHTML = `
            <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 overflow-hidden bg-neutral-100 border border-neutral-200">
                <img src="img/schippy-avatar.png" alt="Schippy" class="w-full h-full object-cover">
            </div>
            <div class="w-full">
                <div class="bg-white border border-neutral-200 rounded-[8px] p-4 shadow-sm mb-3 w-full relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-1 bg-copilot-brand opacity-80"></div>
                    <div class="flex items-center gap-2 mb-4">
                        <div class="w-6 h-6 rounded bg-copilot-bg flex items-center justify-center text-copilot-brand">
                            <i data-lucide="arrow-left-right" class="w-3.5 h-3.5"></i>
                        </div>
                        <h4 class="text-[12px] font-bold text-neutral-600 uppercase tracking-widest">${data.base.name} vs ${data.compare.name}</h4>
                    </div>
                    ${data.materialContext && data.materialContext !== "All Materials" ? `<p class="text-[13px] text-neutral-600 mb-3">Material: <strong>${data.materialContext}</strong></p>` : ""}

                    <div class="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                        <!-- Base Target -->
                        <div>
                            <p class="font-bold text-[14px] text-neutral-900 border-b border-neutral-100 pb-1 mb-2">${data.base.name}</p>
                            <div class="space-y-1.5 text-[12px]">
                                <div class="flex justify-between"><span class="text-neutral-500">Cases</span> <span class="font-medium">${data.base.cases}</span></div>
                                <div class="flex justify-between"><span class="text-neutral-500">Mit. Val.</span> <span class="font-medium">${data.base.mitigatedValue}</span></div>
                                <div class="flex justify-between"><span class="text-neutral-500">Origins</span> <span class="font-medium">${data.base.activeOrigins}</span></div>
                                <div class="flex justify-between"><span class="text-neutral-500">Forecast</span> <span class="font-medium">${data.base.forecast}</span></div>
                                <div class="flex justify-between"><span class="text-neutral-500">Variance</span> <span class="font-medium text-success-700">${data.base.variance}</span></div>
                            </div>
                        </div>
                        <!-- Compare Target -->
                        <div>
                            <p class="font-bold text-[14px] text-neutral-900 border-b border-neutral-100 pb-1 mb-2">${data.compare.name}</p>
                            <div class="space-y-1.5 text-[12px]">
                                <div class="flex justify-between"><span class="text-neutral-500">Cases</span> <span class="font-medium">${data.compare.cases}</span></div>
                                <div class="flex justify-between"><span class="text-neutral-500">Mit. Val.</span> <span class="font-medium">${data.compare.mitigatedValue}</span></div>
                                <div class="flex justify-between"><span class="text-neutral-500">Origins</span> <span class="font-medium">${data.compare.activeOrigins}</span></div>
                                <div class="flex justify-between"><span class="text-neutral-500">Forecast</span> <span class="font-medium">${data.compare.forecast}</span></div>
                                <div class="flex justify-between"><span class="text-neutral-500">Variance</span> <span class="font-medium text-error-700">${data.compare.variance}</span></div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-neutral-50 rounded-md p-2 mt-2 border border-neutral-100">
                        <p class="text-[11px] text-neutral-600 flex items-start gap-1.5 leading-snug">
                            <i data-lucide="info" class="w-3.5 h-3.5 shrink-0 text-copilot-brand mt-0.5"></i> 
                            <span>${data.insight}</span>
                        </p>
                    </div>
                </div>
            </div>
        `;

    chatBox.appendChild(div);
    if (window.lucide) lucide.createIcons();
    scrollToBottom();
  }

  function renderComparisonTable(proposal) {
    const div = document.createElement("div");
    div.className =
      "bg-white font-sans mt-2 mb-2 w-full animate-fade-in-up pr-2";
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
    if (window.lucide) lucide.createIcons();
    prefillInput("Yes");
    scrollToBottom();
  }

  function renderSummaryAndApply() {
    // Remove typing indicator if present
    hideTypingIndicator();

    const proposal = session.currentProposal;

    // Render bot message with summary
    const div = document.createElement("div");
    div.className =
      "flex items-start gap-3 w-full animate-fade-in-up font-sans mt-2";
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
                            <li>Logged: ${new Date().toISOString().split("T")[0]}</li>
                        </ul>
                    </div>
                </div>
                
                <p class="mb-3">The batch will route <strong>${proposal.proposedRouteText}</strong> with a <strong>${proposal.netBenefit} net benefit</strong>.</p>
                <p>Need to adjust another batch or compare an alternative route?</p>
            </div>
        `;
    chatBox.appendChild(div);
    if (window.lucide) lucide.createIcons();
    prefillInput("That's all, thanks.");
    scrollToBottom();

    // 🚨 HIGHLIGHT ROW 1 (index 0) of the expanded accordion to simulate the AI action
    const innerTableBody = document.getElementById("inner-table-body-0");
    if (innerTableBody) {
      const highlightRow = innerTableBody.children[0];
      highlightRow.classList.add(
        "bg-[#F3F0FF]",
        "transition-all",
        "duration-500",
      ); // Persistent purple background

      // Target the ASSIGNED ACTION select (index 0 of selects inside the row)
      const actionSelect = highlightRow.querySelectorAll("select")[0];
      if (actionSelect) {
        actionSelect.innerHTML = '<option value="Assigned">Assigned</option>';
        actionSelect.classList.remove("border-neutral-300", "text-neutral-700");
        actionSelect.classList.add(
          "border-copilot-brand",
          "text-copilot-brand",
          "font-medium",
          "ring-1",
          "ring-copilot-brand",
        );
      }

      // Update the checkbox button in the final column
      const btnTd = highlightRow.children[10]; // Note: index changed due to more columns
      const btn = btnTd.querySelector("button");
      if (btn) {
        btn.classList.remove(
          "border-neutral-300",
          "bg-white",
          "hover:bg-neutral-50",
        );
        btn.classList.add("border-copilot-brand", "bg-copilot-brand");
        btn.innerHTML =
          '<i data-lucide="check" class="w-4 h-4 text-white"></i>';
      }
    }

    if (window.lucide) lucide.createIcons();
  }

  function appendMessage(content, sender) {
    const messageDiv = document.createElement("div");

    if (sender === "bot") {
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
    div.className =
      "flex items-start gap-3 w-full animate-fade-in-up font-sans mt-2";
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

  function renderComparisonTopMaterials(baseName, compName, scope) {
    let title = "";
    let subtitle = "";
    let rows = [];

    // ✅ NUEVO: Mapa de datos por destino para scope="compare"
    const topMaterialsByDestination = {
      joliet: [
        { material: "Pepsi Zero 12pk", matId: "02001234567890001", origin: "Stockton (2053)", totalCs: "1,410", mitVal: "$9,850", delta: "+1.4%" },
        { material: "Mountain Dew 20oz", matId: "02009876543210002", origin: "Atlanta (3368)", totalCs: "1,220", mitVal: "$8,910", delta: "-0.4%" },
        { material: "Gatorade Orange 20oz", matId: "00005200046458000", origin: "Lakeland (4040)", totalCs: "1,170", mitVal: "$8,240", delta: "+0.9%" },
      ],
      tracy: [
        { material: "Quaker Oats 32oz", matId: "03001111111111111", origin: "Memphis (2045)", totalCs: "890", mitVal: "$6,230", delta: "+0.5%" },
        { material: "Tropicana Orange Juice", matId: "03002222222222222", origin: "Jacksonville (3340)", totalCs: "720", mitVal: "$5,040", delta: "-1.2%" },
        { material: "Gatorade Cool Blue 20oz", matId: "03003333333333333", origin: "Dallas (3289)", totalCs: "650", mitVal: "$4,550", delta: "+0.8%" },
      ],
    };

    if (scope === "base") {
      title = `Top Materials — ${baseName}`;
      subtitle = `Top materials currently contributing to ${baseName}.`;
      rows = [
        {
          material: "Gatorade Fruit Punch 20oz",
          matId: "01003495248939888",
          origin: "Cedar Rapids (3227)",
          totalCs: "1,590",
          mitVal: "$10,640",
          delta: "+1.8%",
        },
        {
          material: "Gatorade Glacier Freeze 20oz",
          matId: "01005200005281000",
          origin: "Indianapolis (3389)",
          totalCs: "1,740",
          mitVal: "$11,220",
          delta: "+2.9%",
        },
        {
          material: "Gatorade Lemon Lime 20oz",
          matId: "01005000010166001",
          origin: "Blue Ridge (1008)",
          totalCs: "1,820",
          mitVal: "$12,480",
          delta: "+4.1%",
        },
      ];
    } else if (scope === "compare") {
      // ✅ FIXED: Usar mapa de datos por destino en lugar de hardcode genérico
      const compNameLower = compName.toLowerCase();
      const destKey = compNameLower.includes("joliet") ? "joliet" 
                    : compNameLower.includes("tracy") ? "tracy"
                    : "joliet"; // fallback

      title = `Top Materials — ${compName}`;
      subtitle = `Top materials currently contributing to ${compName}.`;
      rows = topMaterialsByDestination[destKey];
    } else {
      title = `Top Materials — ${baseName} vs ${compName}`;
      subtitle = `Comparing leading materials across both locations.`;
      rows = [
        {
          material: "Gatorade Lemon Lime 20oz",
          base: "1,820 CS",
          compare: "1,120 CS",
          delta: `${baseName} higher`,
        },
        {
          material: "Gatorade Glacier Freeze 20oz",
          base: "1,740 CS",
          compare: "980 CS",
          delta: `${baseName} higher`,
        },
        {
          material: "Gatorade Orange 20oz",
          base: "1,450 CS",
          compare: "1,170 CS",
          delta: `${baseName} slightly higher`,
        },
      ];
    }

    let html = `
            <div class="mt-3 rounded-[8px] border border-neutral-200 bg-white shadow-sm overflow-hidden mb-4 relative">
                <div class="absolute top-0 left-0 w-full h-1 bg-copilot-brand opacity-80"></div>
                <div class="p-4">
                    <div class="text-[12px] font-bold uppercase tracking-widest text-neutral-600 mb-2 mt-1">${title}</div>
                    <div class="text-[13px] text-neutral-600 mb-4">${subtitle}</div>
        `;

    if (scope === "both") {
      html += `
                <div class="overflow-x-auto scrollbar-hide">
                    <table class="w-full text-left text-[12px] border-collapse min-w-[400px]">
                        <thead>
                            <tr class="border-b border-neutral-200 text-neutral-900 font-bold">
                                <th class="py-2 pr-3">Material</th>
                                <th class="py-2 pr-3">${baseName}</th>
                                <th class="py-2 pr-3">${compName}</th>
                                <th class="py-2">Summary</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

      rows.forEach((row) => {
        html += `
                    <tr class="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors cursor-pointer" onclick="window.triggerSilentAction('VIEW_MATERIAL_DETAIL|${row.matId || 'unknown'}|${row.material}')">
                        <td class="py-2 pr-3 font-medium text-neutral-900 truncate max-w-[150px]">${row.material}</td>
                        <td class="py-2 pr-3 text-neutral-700">${row.base}</td>
                        <td class="py-2 pr-3 text-neutral-700">${row.compare}</td>
                        <td class="py-2 text-neutral-600">${row.delta}</td>
                    </tr>
                `;
      });

      html += `</tbody></table></div>`;
    } else {
      html += `
                <div class="overflow-x-auto scrollbar-hide">
                    <table class="w-full text-left text-[12px] border-collapse min-w-[500px]">
                        <thead>
                            <tr class="border-b border-neutral-200 text-neutral-900 font-bold">
                                <th class="py-2 pr-3">Material</th>
                                <th class="py-2 pr-3">Mat ID</th>
                                <th class="py-2 pr-3">Top Origin</th>
                                <th class="py-2 pr-3">Total CS</th>
                                <th class="py-2 pr-3">Mit. Val. ($)</th>
                                <th class="py-2">Δ vs Forecast</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

      rows.forEach((row) => {
        html += `
                    <tr class="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors cursor-pointer" onclick="window.triggerSilentAction('VIEW_MATERIAL_DETAIL|${row.matId || 'unknown'}|${row.material}')">
                        <td class="py-2 pr-3 font-medium text-neutral-900 truncate max-w-[120px]">${row.material}</td>
                        <td class="py-2 pr-3 text-neutral-700 font-mono text-[11px]">${row.matId}</td>
                        <td class="py-2 pr-3 text-neutral-700">${row.origin}</td>
                        <td class="py-2 pr-3 text-neutral-700 font-mono text-[11px]">${row.totalCs}</td>
                        <td class="py-2 pr-3 text-neutral-700 font-mono text-[11px]">${row.mitVal}</td>
                        <td class="py-2 text-neutral-700 font-mono text-[11px]">${row.delta}</td>
                    </tr>
                `;
      });

      html += `</tbody></table></div>`;
    }

    html += `
                </div>
            </div>
        `;

    appendMessage(html, "bot");
    scrollToBottom();
  }

  function scrollToBottom() {
    chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
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
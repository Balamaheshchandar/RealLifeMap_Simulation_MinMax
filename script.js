/**
 * Minimax Algorithm – Real-Life Decision Map
 * Educational Prototype for AI Game Theory & Adversarial Pathfinding
 *
 * Technologies: Vanilla JavaScript, SVG DOM, CSS3
 * Pure client-side implementation with no external libraries.
 */

// ============================================================================
// 1. DATA STRUCTURES & TREE DEFINITION
// ============================================================================

/** Default terminal road utility values */
const DEFAULT_VALUES = {
  A1: 8, // Clearway Highway
  A2: 6, // Expressway with minor delay
  B1: 5, // Parkway Midtown
  B2: 4, // Construction detour
  C1: 3, // Severe weather corridor
  C2: 7  // Scenic coastal bypass
};

let currentValues = { ...DEFAULT_VALUES };

/**
 * Constructs the Minimax Game Tree data structure based on current terminal values.
 */
function buildGameTree(values) {
  return {
    name: "HOME",
    type: "MAX",
    mapNodeId: "node_map_HOME",
    treeNodeId: "node_tree_HOME",
    roadId: null,
    scoreBadgeMapId: "score_map_HOME",
    scoreBadgeTreeId: "score_tree_HOME",
    children: [
      {
        name: "A",
        type: "MIN",
        routeTitle: "Express Route A",
        mapNodeId: "node_map_A",
        treeNodeId: "node_tree_A",
        roadId: "path_HOME_A",
        treeEdgeId: "tEdge_HOME_A",
        scoreBadgeMapId: "score_map_A",
        scoreBadgeTreeId: "score_tree_A",
        children: [
          {
            name: "A1",
            type: "TERMINAL",
            value: Number(values.A1),
            waypoint: "Waypoint D1",
            mapNodeId: "node_map_A1",
            treeNodeId: "node_tree_A1",
            roadId: "path_A_A1",
            terminalDestRoadId: "path_A1_DEST",
            treeEdgeId: "tEdge_A_A1"
          },
          {
            name: "A2",
            type: "TERMINAL",
            value: Number(values.A2),
            waypoint: "Waypoint D2",
            mapNodeId: "node_map_A2",
            treeNodeId: "node_tree_A2",
            roadId: "path_A_A2",
            terminalDestRoadId: "path_A2_DEST",
            treeEdgeId: "tEdge_A_A2"
          }
        ]
      },
      {
        name: "B",
        type: "MIN",
        routeTitle: "Central Route B",
        mapNodeId: "node_map_B",
        treeNodeId: "node_tree_B",
        roadId: "path_HOME_B",
        treeEdgeId: "tEdge_HOME_B",
        scoreBadgeMapId: "score_map_B",
        scoreBadgeTreeId: "score_tree_B",
        children: [
          {
            name: "B1",
            type: "TERMINAL",
            value: Number(values.B1),
            waypoint: "Waypoint E1",
            mapNodeId: "node_map_B1",
            treeNodeId: "node_tree_B1",
            roadId: "path_B_B1",
            terminalDestRoadId: "path_B1_DEST",
            treeEdgeId: "tEdge_B_B1"
          },
          {
            name: "B2",
            type: "TERMINAL",
            value: Number(values.B2),
            waypoint: "Waypoint E2",
            mapNodeId: "node_map_B2",
            treeNodeId: "node_tree_B2",
            roadId: "path_B_B2",
            terminalDestRoadId: "path_B2_DEST",
            treeEdgeId: "tEdge_B_B2"
          }
        ]
      },
      {
        name: "C",
        type: "MIN",
        routeTitle: "South Route C",
        mapNodeId: "node_map_C",
        treeNodeId: "node_tree_C",
        roadId: "path_HOME_C",
        treeEdgeId: "tEdge_HOME_C",
        scoreBadgeMapId: "score_map_C",
        scoreBadgeTreeId: "score_tree_C",
        children: [
          {
            name: "C1",
            type: "TERMINAL",
            value: Number(values.C1),
            waypoint: "Waypoint F1",
            mapNodeId: "node_map_C1",
            treeNodeId: "node_tree_C1",
            roadId: "path_C_C1",
            terminalDestRoadId: "path_C1_DEST",
            treeEdgeId: "tEdge_C_C1"
          },
          {
            name: "C2",
            type: "TERMINAL",
            value: Number(values.C2),
            waypoint: "Waypoint F2",
            mapNodeId: "node_map_C2",
            treeNodeId: "node_tree_C2",
            roadId: "path_C_C2",
            terminalDestRoadId: "path_C2_DEST",
            treeEdgeId: "tEdge_C_C2"
          }
        ]
      }
    ]
  };
}

// ============================================================================
// 2. MINIMAX ALGORITHM IMPLEMENTATION & STEP RECORDER
// ============================================================================

/**
 * Standard recursive Minimax function.
 * Calculates optimal value and chosen best path.
 */
function recursiveMinimax(node) {
  if (node.type === "TERMINAL") {
    return { value: node.value, bestChild: null };
  }

  if (node.type === "MAX") {
    let maxVal = -Infinity;
    let bestChild = null;
    for (const child of node.children) {
      const childResult = recursiveMinimax(child);
      if (childResult.value > maxVal) {
        maxVal = childResult.value;
        bestChild = child;
      }
    }
    return { value: maxVal, bestChild };
  }

  if (node.type === "MIN") {
    let minVal = Infinity;
    let bestChild = null;
    for (const child of node.children) {
      const childResult = recursiveMinimax(child);
      if (childResult.value < minVal) {
        minVal = childResult.value;
        bestChild = child;
      }
    }
    return { value: minVal, bestChild };
  }
}

/**
 * Generates the sequence of exactly 10 educational execution steps:
 * Steps 1-2: Evaluate A1, A2
 * Step 3: Evaluate MIN Junction A
 * Steps 4-5: Evaluate B1, B2
 * Step 6: Evaluate MIN Junction B
 * Steps 7-8: Evaluate C1, C2
 * Step 9: Evaluate MIN Junction C
 * Step 10: Evaluate MAX Root HOME -> Final optimal decision found
 */
function recordExecutionSteps(tree) {
  const steps = [];

  const nodeA = tree.children[0];
  const nodeA1 = nodeA.children[0];
  const nodeA2 = nodeA.children[1];

  const nodeB = tree.children[1];
  const nodeB1 = nodeB.children[0];
  const nodeB2 = nodeB.children[1];

  const nodeC = tree.children[2];
  const nodeC1 = nodeC.children[0];
  const nodeC2 = nodeC.children[1];

  // Helper to record a terminal evaluation step
  function makeTerminalStep(stepNum, node, parentNode) {
    return {
      stepNum,
      level: "Terminal",
      nodeName: node.name,
      nodeType: "TERMINAL",
      targetNode: node,
      parentNode: parentNode,
      operation: `Leaf Value = ${node.value}`,
      result: node.value,
      explanation: `Evaluating terminal road ${node.name} (${node.waypoint}). This leaf provides a utility payoff score of ${node.value} if traveled.`,
      calcBoxTitle: `Terminal Leaf ${node.name}`,
      calcFormula: `Road Utility Score = ${node.value}`,
      calcResult: `Payoff: ${node.value}`,
      activeNodes: [node.mapNodeId, node.treeNodeId],
      activePaths: [node.roadId, node.treeEdgeId],
      calcPopupLocation: { map: node.mapNodeId, tree: node.treeNodeId },
      popupText: { op: `LEAF ${node.name}`, res: `Score = ${node.value}` }
    };
  }

  // STEP 1: Evaluate A1
  steps.push(makeTerminalStep(1, nodeA1, nodeA));

  // STEP 2: Evaluate A2
  steps.push(makeTerminalStep(2, nodeA2, nodeA));

  // STEP 3: MIN Node A
  const minValA = Math.min(nodeA1.value, nodeA2.value);
  const chosenSubA = nodeA1.value <= nodeA2.value ? nodeA1 : nodeA2;
  const rejectedSubA = chosenSubA === nodeA1 ? nodeA2 : nodeA1;
  steps.push({
    stepNum: 3,
    level: "MIN",
    nodeName: "Junction A",
    nodeType: "MIN",
    targetNode: nodeA,
    operation: `MIN(${nodeA1.value}, ${nodeA2.value})`,
    result: minValA,
    explanation: `At Junction A, the adversarial environment/opponent selects the MINIMUM utility route. It compares ${nodeA1.name} (${nodeA1.value}) and ${nodeA2.name} (${nodeA2.value}), forcing the lower score: ${minValA}.`,
    calcBoxTitle: "MIN Junction A Evaluation",
    calcFormula: `A = MIN(${nodeA1.value}, ${nodeA2.value})`,
    calcResult: `Result: ${minValA}`,
    activeNodes: [nodeA.mapNodeId, nodeA.treeNodeId],
    activePaths: [nodeA.roadId, nodeA.treeEdgeId, chosenSubA.roadId, chosenSubA.treeEdgeId],
    rejectedPaths: [rejectedSubA.roadId, rejectedSubA.treeEdgeId],
    nodeScoreUpdate: { node: nodeA, score: minValA },
    tableRowUpdate: { rowId: "row_A", resId: "res_table_A", text: `= ${minValA}` },
    calcPopupLocation: { map: nodeA.mapNodeId, tree: nodeA.treeNodeId },
    popupText: { op: `MIN(${nodeA1.value}, ${nodeA2.value})`, res: `➔ A = ${minValA}` }
  });

  // STEP 4: Evaluate B1
  steps.push(makeTerminalStep(4, nodeB1, nodeB));

  // STEP 5: Evaluate B2
  steps.push(makeTerminalStep(5, nodeB2, nodeB));

  // STEP 6: MIN Node B
  const minValB = Math.min(nodeB1.value, nodeB2.value);
  const chosenSubB = nodeB1.value <= nodeB2.value ? nodeB1 : nodeB2;
  const rejectedSubB = chosenSubB === nodeB1 ? nodeB2 : nodeB1;
  steps.push({
    stepNum: 6,
    level: "MIN",
    nodeName: "Junction B",
    nodeType: "MIN",
    targetNode: nodeB,
    operation: `MIN(${nodeB1.value}, ${nodeB2.value})`,
    result: minValB,
    explanation: `At Junction B, the adversarial opponent compares ${nodeB1.name} (${nodeB1.value}) and ${nodeB2.name} (${nodeB2.value}). MIN chooses the minimum score: ${minValB}.`,
    calcBoxTitle: "MIN Junction B Evaluation",
    calcFormula: `B = MIN(${nodeB1.value}, ${nodeB2.value})`,
    calcResult: `Result: ${minValB}`,
    activeNodes: [nodeB.mapNodeId, nodeB.treeNodeId],
    activePaths: [nodeB.roadId, nodeB.treeEdgeId, chosenSubB.roadId, chosenSubB.treeEdgeId],
    rejectedPaths: [rejectedSubB.roadId, rejectedSubB.treeEdgeId],
    nodeScoreUpdate: { node: nodeB, score: minValB },
    tableRowUpdate: { rowId: "row_B", resId: "res_table_B", text: `= ${minValB}` },
    calcPopupLocation: { map: nodeB.mapNodeId, tree: nodeB.treeNodeId },
    popupText: { op: `MIN(${nodeB1.value}, ${nodeB2.value})`, res: `➔ B = ${minValB}` }
  });

  // STEP 7: Evaluate C1
  steps.push(makeTerminalStep(7, nodeC1, nodeC));

  // STEP 8: Evaluate C2
  steps.push(makeTerminalStep(8, nodeC2, nodeC));

  // STEP 9: MIN Node C
  const minValC = Math.min(nodeC1.value, nodeC2.value);
  const chosenSubC = nodeC1.value <= nodeC2.value ? nodeC1 : nodeC2;
  const rejectedSubC = chosenSubC === nodeC1 ? nodeC2 : nodeC1;
  steps.push({
    stepNum: 9,
    level: "MIN",
    nodeName: "Junction C",
    nodeType: "MIN",
    targetNode: nodeC,
    operation: `MIN(${nodeC1.value}, ${nodeC2.value})`,
    result: minValC,
    explanation: `At Junction C, the opponent compares ${nodeC1.name} (${nodeC1.value}) and ${nodeC2.name} (${nodeC2.value}). MIN picks the lowest outcome: ${minValC}.`,
    calcBoxTitle: "MIN Junction C Evaluation",
    calcFormula: `C = MIN(${nodeC1.value}, ${nodeC2.value})`,
    calcResult: `Result: ${minValC}`,
    activeNodes: [nodeC.mapNodeId, nodeC.treeNodeId],
    activePaths: [nodeC.roadId, nodeC.treeEdgeId, chosenSubC.roadId, chosenSubC.treeEdgeId],
    rejectedPaths: [rejectedSubC.roadId, rejectedSubC.treeEdgeId],
    nodeScoreUpdate: { node: nodeC, score: minValC },
    tableRowUpdate: { rowId: "row_C", resId: "res_table_C", text: `= ${minValC}` },
    calcPopupLocation: { map: nodeC.mapNodeId, tree: nodeC.treeNodeId },
    popupText: { op: `MIN(${nodeC1.value}, ${nodeC2.value})`, res: `➔ C = ${minValC}` }
  });

  // STEP 10: MAX Node HOME
  const maxHomeVal = Math.max(minValA, minValB, minValC);
  let bestRouteNode = nodeA;
  let bestSubNode = chosenSubA;

  if (maxHomeVal === minValB && minValB > minValA) {
    bestRouteNode = nodeB;
    bestSubNode = chosenSubB;
  } else if (maxHomeVal === minValC && minValC > minValA && minValC > minValB) {
    bestRouteNode = nodeC;
    bestSubNode = chosenSubC;
  }

  // Identify rejected routes from HOME
  const rejectedJunctions = [nodeA, nodeB, nodeC].filter(n => n !== bestRouteNode);

  steps.push({
    stepNum: 10,
    level: "MAX",
    nodeName: "HOME",
    nodeType: "MAX",
    targetNode: tree,
    operation: `MAX(${minValA}, ${minValB}, ${minValC})`,
    result: maxHomeVal,
    bestRoute: bestRouteNode,
    bestSubNode: bestSubNode,
    explanation: `Returned to HOME (MAX Node). The AI traveler compares the backed-up worst-case scores of all 3 routes: A = ${minValA}, B = ${minValB}, C = ${minValC}. MAX(${minValA}, ${minValB}, ${minValC}) = ${maxHomeVal}. The AI selects Route ${bestRouteNode.name}!`,
    calcBoxTitle: "MAX Root HOME Decision",
    calcFormula: `MAX(A=${minValA}, B=${minValB}, C=${minValC})`,
    calcResult: `Optimal Decision: Route ${bestRouteNode.name} (Utility = ${maxHomeVal})`,
    activeNodes: [tree.mapNodeId, tree.treeNodeId, bestRouteNode.mapNodeId, bestRouteNode.treeNodeId, bestSubNode.mapNodeId, bestSubNode.treeNodeId, "node_map_DEST"],
    optimalFullRoute: [
      bestRouteNode.roadId,
      bestRouteNode.treeEdgeId,
      bestSubNode.roadId,
      bestSubNode.treeEdgeId,
      bestSubNode.terminalDestRoadId
    ],
    rejectedPaths: rejectedJunctions.map(j => j.roadId).concat(rejectedJunctions.map(j => j.treeEdgeId)),
    nodeScoreUpdate: { node: tree, score: maxHomeVal },
    tableRowUpdate: { rowId: "row_HOME", resId: "res_table_HOME", text: `= ${maxHomeVal} (Route ${bestRouteNode.name})` },
    calcPopupLocation: { map: tree.mapNodeId, tree: tree.treeNodeId },
    popupText: { op: `MAX(${minValA}, ${minValB}, ${minValC})`, res: `➔ Route ${bestRouteNode.name} = ${maxHomeVal}` }
  });

  return steps;
}

// ============================================================================
// 3. CONTROLLER & APPLICATION STATE
// ============================================================================

const state = {
  tree: null,
  steps: [],
  currentStepIndex: -1, // -1 means initial reset state, 0 to 9 are steps 1 to 10
  autoPlayTimer: null,
  autoPlaySpeed: 1100, // milliseconds
  isAutoPlaying: false,
  currentView: "map" // "map", "tree", "dual"
};

// ============================================================================
// 4. DOM ELEMENTS CACHE
// ============================================================================

const DOM = {
  // Buttons
  btnStart: document.getElementById("btnStart"),
  btnPrev: document.getElementById("btnPrev"),
  btnNext: document.getElementById("btnNext"),
  btnAutoPlay: document.getElementById("btnAutoPlay"),
  btnReset: document.getElementById("btnReset"),
  btnShowFull: document.getElementById("btnShowFull"),
  speedSelect: document.getElementById("speedSelect"),

  // Modals & Triggers
  btnQuickViva: document.getElementById("btnQuickViva"),
  btnEditValues: document.getElementById("btnEditValues"),
  vivaModal: document.getElementById("vivaModal"),
  btnCloseViva: document.getElementById("btnCloseViva"),
  customizerModal: document.getElementById("customizerModal"),
  btnCloseCustomizer: document.getElementById("btnCloseCustomizer"),
  btnApplyCustom: document.getElementById("btnApplyCustom"),
  btnResetCustom: document.getElementById("btnResetCustom"),

  // View Switchers
  tabMapView: document.getElementById("tabMapView"),
  tabTreeView: document.getElementById("tabTreeView"),
  tabDualView: document.getElementById("tabDualView"),
  viewportWrapper: document.getElementById("viewportWrapper"),
  mapViewContainer: document.getElementById("mapViewContainer"),
  treeViewContainer: document.getElementById("treeViewContainer"),
  currentViewLabel: document.getElementById("currentViewLabel"),

  // Educational Step Tracker Elements
  trackerStepNum: document.getElementById("trackerStepNum"),
  trackerCurrentNode: document.getElementById("trackerCurrentNode"),
  trackerOperation: document.getElementById("trackerOperation"),
  trackerResult: document.getElementById("trackerResult"),
  trackerSummaryText: document.getElementById("trackerSummaryText"),
  layerMax: document.getElementById("layerMax"),
  layerMin: document.getElementById("layerMin"),
  layerTerm: document.getElementById("layerTerm"),

  // Right Side Dynamic Panels
  stepCounterBadge: document.getElementById("stepCounterBadge"),
  liveNodeName: document.getElementById("liveNodeName"),
  liveNodeTypeTag: document.getElementById("liveNodeTypeTag"),
  liveCalcFormula: document.getElementById("liveCalcFormula"),
  liveCalcResult: document.getElementById("liveCalcResult"),
  liveExplanationText: document.getElementById("liveExplanationText"),
  finalResultCard: document.getElementById("finalResultCard"),
  finalExplanationText: document.getElementById("finalExplanationText"),

  // Formula Table Results
  resTableA: document.getElementById("res_table_A"),
  resTableB: document.getElementById("res_table_B"),
  resTableC: document.getElementById("res_table_C"),
  resTableHOME: document.getElementById("res_table_HOME"),

  // SVG Calculation Popups
  mapCalcPopup: document.getElementById("mapCalcPopup"),
  treeCalcPopup: document.getElementById("treeCalcPopup")
};

// ============================================================================
// 5. INITIALIZATION & RESET
// ============================================================================

function initSimulation() {
  state.tree = buildGameTree(currentValues);
  state.steps = recordExecutionSteps(state.tree);
  state.currentStepIndex = -1;

  stopAutoPlay();
  updateStaticLeafLabels();
  resetVisualStyles();
  updateUI();
}

/** Updates static leaf score labels on map & tree SVGs based on currentValues */
function updateStaticLeafLabels() {
  for (const [key, val] of Object.entries(currentValues)) {
    // Map leaf static score
    const mapNode = document.getElementById(`node_map_${key}`);
    if (mapNode) {
      const scoreTxt = mapNode.querySelector(".node-score-static");
      if (scoreTxt) scoreTxt.textContent = val;
    }
    // Tree leaf static score
    const treeNode = document.getElementById(`node_tree_${key}`);
    if (treeNode) {
      const scoreTxt = treeNode.querySelector(".node-score-static");
      if (scoreTxt) scoreTxt.textContent = val;
    }
  }
}

/** Resets all node halos, scores, paths, popups, and badges to initial state */
function resetVisualStyles() {
  // Clear all pulsing/evaluating/optimal classes from all nodes & paths
  document.querySelectorAll(".node-active-eval, .node-optimal-selected").forEach(el => {
    el.classList.remove("node-active-eval", "node-optimal-selected");
  });

  document.querySelectorAll(".path-evaluating, .path-optimal, .path-rejected").forEach(el => {
    el.classList.remove("path-evaluating", "path-optimal", "path-rejected");
  });

  // Hide score badges on A, B, C, HOME
  ["HOME", "A", "B", "C"].forEach(id => {
    const mapScore = document.getElementById(`score_map_${id}`);
    if (mapScore) mapScore.style.display = "none";
    const treeScore = document.getElementById(`score_tree_${id}`);
    if (treeScore) treeScore.style.display = "none";
  });

  // Hide popups
  if (DOM.mapCalcPopup) DOM.mapCalcPopup.style.display = "none";
  if (DOM.treeCalcPopup) DOM.treeCalcPopup.style.display = "none";

  // Reset formula table
  DOM.resTableA.textContent = "= ?";
  DOM.resTableB.textContent = "= ?";
  DOM.resTableC.textContent = "= ?";
  DOM.resTableHOME.textContent = "= ?";

  document.querySelectorAll(".table-row").forEach(row => row.classList.remove("highlight-eval"));

  // Hide final result card
  DOM.finalResultCard.style.display = "none";
}

// ============================================================================
// 6. STEP RENDERING & VISUAL EFFECTS
// ============================================================================

/**
 * Re-renders the entire visual state up to the currentStepIndex.
 * This guarantees proper display whether stepping forward, backward, or jumping.
 */
function renderCurrentStep() {
  resetVisualStyles();

  if (state.currentStepIndex < 0) {
    updateUIForIdle();
    return;
  }

  // Restore evaluated scores for previous and current steps
  for (let i = 0; i <= state.currentStepIndex; i++) {
    const s = state.steps[i];

    // If step resolved a MIN/MAX node score, show badge
    if (s.nodeScoreUpdate) {
      const node = s.nodeScoreUpdate.node;
      const score = s.nodeScoreUpdate.score;

      const mapScoreBadge = document.getElementById(node.scoreBadgeMapId);
      if (mapScoreBadge) {
        mapScoreBadge.style.display = "block";
        const txt = mapScoreBadge.querySelector(".score-val");
        if (txt) txt.textContent = score;
      }

      const treeScoreBadge = document.getElementById(node.scoreBadgeTreeId);
      if (treeScoreBadge) {
        treeScoreBadge.style.display = "block";
        const txt = treeScoreBadge.querySelector(".score-val");
        if (txt) txt.textContent = score;
      }
    }

    // Update formula table
    if (s.tableRowUpdate) {
      const el = document.getElementById(s.tableRowUpdate.resId);
      if (el) el.textContent = s.tableRowUpdate.text;
    }
  }

  const currentStep = state.steps[state.currentStepIndex];

  // Highlight current active nodes
  if (currentStep.activeNodes) {
    currentStep.activeNodes.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add("node-active-eval");
      }
    });
  }

  // Highlight current paths
  if (currentStep.activePaths) {
    currentStep.activePaths.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add("path-evaluating");
    });
  }

  // Mark rejected paths
  if (currentStep.rejectedPaths) {
    currentStep.rejectedPaths.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add("path-rejected");
    });
  }

  // Highlight active row in formula table
  if (currentStep.tableRowUpdate) {
    const row = document.getElementById(currentStep.tableRowUpdate.rowId);
    if (row) row.classList.add("highlight-eval");
  }

  // Position calculation popups on SVG
  showCalculationPopups(currentStep);

  // If this is the final step (Step 10), trigger optimal final path visualization!
  if (state.currentStepIndex === state.steps.length - 1) {
    renderFinalDecision(currentStep);
  }

  // Update dynamic panels and bottom tracker bar
  updatePanels(currentStep);
}

/**
 * Positions and displays floating calculation popups over the active SVG node.
 */
function showCalculationPopups(step) {
  if (!step.popupText) return;

  const nodeCoordinates = {
    node_map_HOME: { x: 100, y: 220 },
    node_map_A: { x: 310, y: 75 },
    node_map_B: { x: 310, y: 225 },
    node_map_C: { x: 310, y: 375 },
    node_map_A1: { x: 570, y: 35 },
    node_map_A2: { x: 570, y: 130 },
    node_map_B1: { x: 570, y: 190 },
    node_map_B2: { x: 570, y: 280 },
    node_map_C1: { x: 570, y: 340 },
    node_map_C2: { x: 570, y: 435 },

    node_tree_HOME: { x: 480, y: 40 },
    node_tree_A: { x: 220, y: 190 },
    node_tree_B: { x: 480, y: 190 },
    node_tree_C: { x: 740, y: 190 },
    node_tree_A1: { x: 160, y: 390 },
    node_tree_A2: { x: 280, y: 390 },
    node_tree_B1: { x: 420, y: 390 },
    node_tree_B2: { x: 540, y: 390 },
    node_tree_C1: { x: 680, y: 390 },
    node_tree_C2: { x: 800, y: 390 }
  };

  // Map Popup
  if (step.calcPopupLocation && step.calcPopupLocation.map && DOM.mapCalcPopup) {
    const coords = nodeCoordinates[step.calcPopupLocation.map];
    if (coords) {
      DOM.mapCalcPopup.setAttribute("transform", `translate(${coords.x}, ${coords.y})`);
      DOM.mapCalcPopup.querySelector(".popup-text-op").textContent = step.popupText.op;
      DOM.mapCalcPopup.querySelector(".popup-text-res").textContent = step.popupText.res;
      DOM.mapCalcPopup.style.display = "block";
    }
  }

  // Tree Popup
  if (step.calcPopupLocation && step.calcPopupLocation.tree && DOM.treeCalcPopup) {
    const coords = nodeCoordinates[step.calcPopupLocation.tree];
    if (coords) {
      DOM.treeCalcPopup.setAttribute("transform", `translate(${coords.x}, ${coords.y})`);
      DOM.treeCalcPopup.querySelector(".popup-text-op").textContent = step.popupText.op;
      DOM.treeCalcPopup.querySelector(".popup-text-res").textContent = step.popupText.res;
      DOM.treeCalcPopup.style.display = "block";
    }
  }
}

/**
 * Renders the winning optimal route on Step 10
 */
function renderFinalDecision(step) {
  // Add optimal class to chosen route roads and edges
  if (step.optimalFullRoute) {
    step.optimalFullRoute.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove("path-evaluating");
        el.classList.add("path-optimal");
      }
    });
  }

  // Add optimal halo to winning nodes
  [step.targetNode.mapNodeId, step.bestRoute.mapNodeId, step.bestSubNode.mapNodeId, "node_map_DEST"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("node-optimal-selected");
  });

  // Display final result card
  DOM.finalResultCard.style.display = "block";
  DOM.finalExplanationText.innerHTML = `
    The AI selected <strong>Route ${step.bestRoute.name}</strong> because its guaranteed worst-case outcome (<strong>${step.result}</strong>) 
    is strictly superior to the worst-case outcomes of alternative routes. 
    Even if the adversarial environment enforces the lowest-value branch (${step.bestSubNode.name} = ${step.bestSubNode.value}), 
    the AI achieves utility <strong>${step.result}</strong>.
  `;
}

// ============================================================================
// 7. UI TEXT & TRACKER SYNCHRONIZATION
// ============================================================================

function updateUIForIdle() {
  DOM.stepCounterBadge.textContent = "Ready to Start";
  DOM.liveNodeName.textContent = "—";
  DOM.liveNodeTypeTag.textContent = "IDLE";
  DOM.liveNodeTypeTag.className = "status-tag";
  DOM.liveCalcFormula.textContent = "Press \"Start Minimax\" to begin";
  DOM.liveCalcResult.textContent = "Waiting for input...";
  DOM.liveExplanationText.textContent =
    "The Minimax algorithm will explore route options from the bottom leaves upwards, calculating the guaranteed worst-case outcomes for each candidate decision.";

  DOM.trackerStepNum.textContent = "0 / 10";
  DOM.trackerCurrentNode.textContent = "None";
  DOM.trackerOperation.textContent = "—";
  DOM.trackerResult.textContent = "—";
  DOM.trackerSummaryText.textContent =
    "Click \"Start Minimax\" or \"Next Step\" to trace algorithm execution step by step.";

  DOM.layerMax.classList.remove("active");
  DOM.layerMin.classList.remove("active");
  DOM.layerTerm.classList.remove("active");

  updateButtons();
}

function updatePanels(step) {
  // Step Counter
  DOM.stepCounterBadge.textContent = `Step ${step.stepNum} of 10`;

  // Status block
  DOM.liveNodeName.textContent = step.nodeName;
  DOM.liveNodeTypeTag.textContent = step.nodeType;
  DOM.liveNodeTypeTag.className = "status-tag";
  if (step.nodeType === "MAX") DOM.liveNodeTypeTag.classList.add("tag-max");
  else if (step.nodeType === "MIN") DOM.liveNodeTypeTag.classList.add("tag-min");
  else DOM.liveNodeTypeTag.classList.add("tag-term");

  DOM.liveCalcFormula.textContent = step.calcFormula;
  DOM.liveCalcResult.textContent = step.calcResult;
  DOM.liveExplanationText.textContent = step.explanation;

  // Bottom Step Tracker
  DOM.trackerStepNum.textContent = `${step.stepNum} / 10`;
  DOM.trackerCurrentNode.textContent = step.nodeName;
  DOM.trackerOperation.textContent = step.operation;
  DOM.trackerResult.textContent = step.result !== undefined ? String(step.result) : "—";
  DOM.trackerSummaryText.textContent = step.explanation;

  // Layer pills highlight
  DOM.layerMax.classList.toggle("active", step.level === "MAX");
  DOM.layerMin.classList.toggle("active", step.level === "MIN");
  DOM.layerTerm.classList.toggle("active", step.level === "Terminal");

  updateButtons();
}

function updateButtons() {
  const isStarted = state.currentStepIndex >= 0;
  const isFinished = state.currentStepIndex >= state.steps.length - 1;

  DOM.btnPrev.disabled = !isStarted;
  DOM.btnNext.disabled = isFinished;

  if (isFinished) {
    DOM.btnStart.textContent = "↺ Re-run Minimax";
    DOM.btnAutoPlay.disabled = true;
  } else {
    DOM.btnStart.textContent = isStarted ? "▶ Continue" : "▶ Start Minimax";
    DOM.btnAutoPlay.disabled = false;
  }
}

// ============================================================================
// 8. STEP EXECUTION CONTROLS
// ============================================================================

function stepNext() {
  if (state.currentStepIndex < state.steps.length - 1) {
    state.currentStepIndex++;
    renderCurrentStep();
    return true;
  }
  return false;
}

function stepPrev() {
  if (state.currentStepIndex > 0) {
    state.currentStepIndex--;
    renderCurrentStep();
  } else if (state.currentStepIndex === 0) {
    state.currentStepIndex = -1;
    renderCurrentStep();
  }
}

function startMinimax() {
  if (state.currentStepIndex >= state.steps.length - 1) {
    state.currentStepIndex = -1;
  }
  stepNext();
}

function showFullCalculation() {
  stopAutoPlay();
  state.currentStepIndex = state.steps.length - 1;
  renderCurrentStep();
}

function resetSimulation() {
  stopAutoPlay();
  state.currentStepIndex = -1;
  renderCurrentStep();
}

// ============================================================================
// 9. AUTO PLAY ENGINE
// ============================================================================

function startAutoPlay() {
  if (state.currentStepIndex >= state.steps.length - 1) {
    state.currentStepIndex = -1;
  }

  state.isAutoPlaying = true;
  DOM.btnAutoPlay.innerHTML = "⏸ Pause";
  DOM.btnAutoPlay.classList.add("btn-primary");
  DOM.btnAutoPlay.classList.remove("btn-accent");

  runAutoPlayTick();
}

function stopAutoPlay() {
  state.isAutoPlaying = false;
  if (state.autoPlayTimer) {
    clearTimeout(state.autoPlayTimer);
    state.autoPlayTimer = null;
  }
  DOM.btnAutoPlay.innerHTML = "⏩ Auto Play";
  DOM.btnAutoPlay.classList.remove("btn-primary");
  DOM.btnAutoPlay.classList.add("btn-accent");
}

function toggleAutoPlay() {
  if (state.isAutoPlaying) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
}

function runAutoPlayTick() {
  if (!state.isAutoPlaying) return;

  const hasNext = stepNext();
  if (hasNext) {
    state.autoPlayTimer = setTimeout(() => {
      runAutoPlayTick();
    }, state.autoPlaySpeed);
  } else {
    stopAutoPlay();
  }
}

// ============================================================================
// 10. VIEW SWITCHER (MAP, TREE, DUAL)
// ============================================================================

function setViewMode(mode) {
  state.currentView = mode;

  DOM.tabMapView.classList.toggle("active", mode === "map");
  DOM.tabTreeView.classList.toggle("active", mode === "tree");
  DOM.tabDualView.classList.toggle("active", mode === "dual");

  DOM.viewportWrapper.classList.toggle("mode-dual", mode === "dual");

  if (mode === "map") {
    DOM.mapViewContainer.classList.add("active");
    DOM.treeViewContainer.classList.remove("active");
    DOM.currentViewLabel.textContent = "Real-Life Road Map";
  } else if (mode === "tree") {
    DOM.mapViewContainer.classList.remove("active");
    DOM.treeViewContainer.classList.add("active");
    DOM.currentViewLabel.textContent = "Minimax Game Tree";
  } else if (mode === "dual") {
    DOM.mapViewContainer.classList.add("active");
    DOM.treeViewContainer.classList.add("active");
    DOM.currentViewLabel.textContent = "Synchronized Dual View";
  }

  // Re-display current calculation popups in case view container changed
  if (state.currentStepIndex >= 0) {
    showCalculationPopups(state.steps[state.currentStepIndex]);
  }
}

// ============================================================================
// 11. EVENT LISTENERS
// ============================================================================

function bindEvents() {
  // Control buttons
  DOM.btnStart.addEventListener("click", startMinimax);
  DOM.btnNext.addEventListener("click", () => {
    stopAutoPlay();
    stepNext();
  });
  DOM.btnPrev.addEventListener("click", () => {
    stopAutoPlay();
    stepPrev();
  });
  DOM.btnAutoPlay.addEventListener("click", toggleAutoPlay);
  DOM.btnReset.addEventListener("click", resetSimulation);
  DOM.btnShowFull.addEventListener("click", showFullCalculation);

  // Speed selector
  DOM.speedSelect.addEventListener("change", e => {
    state.autoPlaySpeed = Number(e.target.value);
  });

  // View tabs
  DOM.tabMapView.addEventListener("click", () => setViewMode("map"));
  DOM.tabTreeView.addEventListener("click", () => setViewMode("tree"));
  DOM.tabDualView.addEventListener("click", () => setViewMode("dual"));

  // Viva Modal
  DOM.btnQuickViva.addEventListener("click", () => {
    DOM.vivaModal.style.display = "flex";
  });
  DOM.btnCloseViva.addEventListener("click", () => {
    DOM.vivaModal.style.display = "none";
  });
  DOM.vivaModal.addEventListener("click", e => {
    if (e.target === DOM.vivaModal) DOM.vivaModal.style.display = "none";
  });

  // Customizer Modal
  DOM.btnEditValues.addEventListener("click", () => {
    // Populate fields
    for (const [key, val] of Object.entries(currentValues)) {
      const input = document.getElementById(`val_${key}`);
      if (input) input.value = val;
    }
    DOM.customizerModal.style.display = "flex";
  });
  DOM.btnCloseCustomizer.addEventListener("click", () => {
    DOM.customizerModal.style.display = "none";
  });
  DOM.customizerModal.addEventListener("click", e => {
    if (e.target === DOM.customizerModal) DOM.customizerModal.style.display = "none";
  });

  DOM.btnApplyCustom.addEventListener("click", () => {
    for (const key of Object.keys(currentValues)) {
      const input = document.getElementById(`val_${key}`);
      if (input) {
        currentValues[key] = Math.max(0, Math.min(99, Number(input.value) || 0));
      }
    }
    DOM.customizerModal.style.display = "none";
    initSimulation();
  });

  DOM.btnResetCustom.addEventListener("click", () => {
    currentValues = { ...DEFAULT_VALUES };
    for (const [key, val] of Object.entries(currentValues)) {
      const input = document.getElementById(`val_${key}`);
      if (input) input.value = val;
    }
    DOM.customizerModal.style.display = "none";
    initSimulation();
  });

  // Keyboard navigation
  window.addEventListener("keydown", e => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;

    if (e.key === "ArrowRight" || e.key === " ") {
      e.preventDefault();
      stopAutoPlay();
      stepNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      stopAutoPlay();
      stepPrev();
    } else if (e.key === "r" || e.key === "R") {
      resetSimulation();
    } else if (e.key === "Escape") {
      DOM.vivaModal.style.display = "none";
      DOM.customizerModal.style.display = "none";
    }
  });

  // Interactive node clicks (jump to step or inspect node)
  const nodeStepMap = {
    node_map_A1: 0,
    node_map_A2: 1,
    node_map_A: 2,
    node_map_B1: 3,
    node_map_B2: 4,
    node_map_B: 5,
    node_map_C1: 6,
    node_map_C2: 7,
    node_map_C: 8,
    node_map_HOME: 9,

    node_tree_A1: 0,
    node_tree_A2: 1,
    node_tree_A: 2,
    node_tree_B1: 3,
    node_tree_B2: 4,
    node_tree_B: 5,
    node_tree_C1: 6,
    node_tree_C2: 7,
    node_tree_C: 8,
    node_tree_HOME: 9
  };

  Object.entries(nodeStepMap).forEach(([elemId, targetStepIdx]) => {
    const el = document.getElementById(elemId);
    if (el) {
      el.addEventListener("click", () => {
        stopAutoPlay();
        state.currentStepIndex = targetStepIdx;
        renderCurrentStep();
      });
    }
  });
}

// ============================================================================
// 12. RUNTIME STARTUP
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  initSimulation();
});

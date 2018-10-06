/**************************************************************************************************
 * Filename: constants.tsx
 * Contacts: isaach@flowjo.com,
 * Description: Contains constants that are relavent to sending packets using
 *              Inter-process communication (IPC) calls
 *
 * Packet Structure:
 * to-main: {
 *   to-[service name]: {
 *      [intent]: {
 *          [Payload]: {...}
 *      }
 *   }
 * }
 *
 * ex:
 * to-main: {
 *   to-client: {
 *       updateAuthToken: {
 *         "eulaAccepted": false,
 *         "licenseValid": false,
 *         "sessionValid": false,
 *         "signatureVerified": true,
 *         "userMessage": null
 *       }
 *    }
 * }
 *
 * note: The first header will always be 'to-main' since main delegates where the packet will go
 *************************************************************************************************/

// second header to sending a packet, this header specifies the service's destination
export const TO = {
  LicensorService: 'to-licensorService',
  AnalysisService: 'to-analysisService',
  PrefsService: 'to-prefsService',
  ReleasePropsService: 'to-releasePropsService',
  Engine: 'to-engine',
  Client: 'to-client',
  Main: 'to-main',
};

export const FROM = TO;

// third header to sending a packet, this header specifies the intent once the packet arrives to
// the Engine.
export enum EngineRequest {
  verifyToken = 'verifyToken',
  loginRequest = 'login-request',
  setDebugEngine = 'setDebugEngine',
  setDebugEngineResponse = 'setDebugEngineResponse',
  setBackgroundEngineDebug = 'setBackgroundEngineDebug',
  setBackgroundEngineDebugResponse = 'setBackgroundEngineDebugResponse',
}

// third header to sending a packet, this header specifies the intent once the packet arrives to
// the analysis service.
export enum AnalysisServiceRequest {
    addDataFiles = 'addDataFiles',
    addDataFilesResponse = 'addDataFilesResponse',
    removeDataFiles = 'removeDataFiles',   // TODO: As an engine, I need to parse this
    removeDataFilesResponse = 'removeDataFilesResponse', // TODO: As an engine, I need to parse this
    createNewAnalysis = 'createNewAnalysis',
    createNewAnalysisResponse = 'createNewAnalysisResponse',
    setDebug = 'setDebug',
    setDebugResponse = 'setDebugResponse',
    addGroup = 'addGroup',
    addGroupResponse = 'addGroupResponse',
    createGraphDefinition = 'createGraphDefinition',
    createGraphDefinitionResponse = 'createGraphDefinitionResponse',
    generateHistogram = 'generateHistogram',
    generateHistogramResponse = 'generateHistogramResponse',
    getTransform = 'getTransform',
    getTransformResponse = 'getTransformResponse',
    addPopulationDef = 'addPopulationDef',
    addPopulationDefResponse = 'addPopulationDefResponse',
    openAnalysis = 'openAnalysis',
    openAnalysisResponse = 'openAnalysisResponse',
    showAnalysisCaches = 'showAnalysisCaches',
}

export enum ReleasePropsServiceRequest {
  initReleaseProps = 'initReleaseProps',
}
// third header to sending a packet, this header specifies the intent once the packet arrives to
// the prefs service.
export enum PrefsServiceRequest {
    initPrefs = 'initPrefs',
    updatePrefs = 'updatePrefs',
    getDebugState = 'getDebugState',
    setShowUncomped = 'setShowUncomped',
    addEventNumberParameter = 'addEventNumberParameter',
    setTintNewGates = 'setTintNewGates',
}

// third header to sending a packet, this header specifies the intent once the packet arrives to
// the client.
export enum ClientRequest {
  updateAuthToken = 'updateAuthToken',
  setClientDebug = 'setClientDebug',
  setDebugResponse = 'setDebugResponse',
  openPrefsDialog = 'openPrefsDialog',
}

export enum GenericRequest {
  initReleaseProps = 'initReleaseProps',
}
// third header to sending a packet, this header specifies the intent once the packet arrives to
// the main process.
export enum MainRequest {
  setDebugMode = 'setDebugMode',
  setDebugModeResponse = 'setDebugModeResponse',
  getDebugState = 'getDebugState',
}

// third header to sending a packet, this header specifies the intent once the packet arrives to
// the licensor.
export enum LicensorRequest {
  setDebugBackgroundLicensor = 'setDebugBackgroundLicensor',
  setDebugBackgroundLicensorResponse = 'setDebugBackgroundLicensorResponse',
  setDebugConnection = 'setDebugConnection',
  setDebugConnectionResponse = 'setDebugConnectionResponse',
  setDebugInit = 'setDebugInit',
  setDebugInitResponse = 'setDebugInitResponse',
  setDebugLogin = 'setDebugLogin',
  setDebugLoginResponse = 'setDebugLoginResponse',
  setDebugFuzzyID = 'setDebugFuzzyID',
  setDebugFuzzyIDResponse = 'setDebugFuzzyIDResponse',
  setDebugHeartbeat = 'setDebugHeartbeat',
  setDebugHeartbeatResponse = 'setDebugHeartbeatResponse',
}

// *** All request enums need to be placed in this array ***
export const requestTypes = [
  EngineRequest,
  AnalysisServiceRequest,
  ReleasePropsServiceRequest,
  PrefsServiceRequest,
  ClientRequest,
  GenericRequest,
  MainRequest,
  LicensorRequest,
];

// Roles that each group can take on
export enum Role {
  None = 'None',
  Test = 'Test',
  Replicate = 'Replicate',
  Compensation = 'Compensation',
  Baseline = 'Baseline',
  Gating_Level = 'Gating Level',
  Controls = 'Controls',
  Instrumentation = 'Instrumentation',
}

// NOTE: If colors run out, they will be autogenerated in...
// root/clientProcess/reactContainers/AnalysisPanel/GroupDefinitionDIalog/getNextColor.tsx

// Default colors for newly added groups
export enum DefaultColors {
  Red = 'Red',
  Orange = 'Orange',
  Yellow = 'Yellow',
  Green = 'Green',
  Cyan = 'Cyan',
  Blue = 'Blue',
  DarkBlue = 'DarkBlue',
  Violet = 'Violet',
}

export enum GraphTypes {
  Contour = 'Contour',
  Density = 'Density',
  Zebra = 'Zebra',
  Pseudocolor = 'Pseudocolor',
  DotPlot = 'DotPlot',
  Histogram = 'Histogram',
  Timeseries = 'Timeseries',
  HeatmapStatistic = 'HeatmapStatistic',
  Rank = 'Rank',
  Quantile = 'Quantile',
}

export enum ContourLevels {
  TenPercent = '10%',
  FivePercent = '5%',
  TwoPercent = '2%',
  Log = 'log',
}

export enum LineWeights {
  None = 'None',
  Normal = 'Normal',
  Thick = 'Thick',
  VeryHeavy = 'Very Heavy',
}

export enum LineStyles {
  Complex = 'Complex',
  Dashed = 'Dashed',
  DotDashed = 'Dot-dashed',
  Dotted = 'Dotted',
  LongDashed = 'Long-dashed',
  None = 'None',
  Solid = 'Solid',
}

export enum ParameterTypes {
  Parameter = 'Parameter',
  Observation = 'Observation',
}

export enum TransformTypes {
    Linear = 'Linear',
    Log = 'Log',
    Biex = 'Biex',
    ArcSinh = 'ArcSinh',
    Hyperlog = 'Hyperlog',
    Logicle = 'Logicle',
}

export enum PopulationDefTypes {
  gate = 'gate',
  root = 'root',
  and = 'and',
  or = 'or',
  not = 'not',
}

export enum SampleRowType {
  header = 'header',
  normal = 'normal',
}

export enum JSONKeywords {
  POPDEF = 'popDef',
  PARENT_POPDEFS = 'parents',
}

export enum GraphPanelModes {
    ParametersSatellite = 'PARAMETERS_SATELLITE',
    BackGating = 'BACK_GATING',
}

export const key = {
  UP: 38,
  DOWN: 40,
};

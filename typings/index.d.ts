import JsonJsx from "json-jsx";

export = GrafanaJsx;
export as namespace GrafanaJsx;

declare namespace GrafanaJsx {
  /**
   * Props for the Annotation component.
   */
  interface AnnotationProps {
    builtIn: number;
    datasource: string;
    enable: boolean;
    hide: boolean;
    iconColor: string;
    name: string;
    type: string;
    [prop: string]: any;
  }

  /**
   * Props for the Annotations component.
   */
  interface AnnotationsProps {
    [prop: string]: any;
  }

  /**
   * Props for the Dashboard component.
   */
  interface DashboardProps {
    editable: boolean;
    hideControls: boolean;
    graphTooltip: number;
    refresh: string;
    style: string;
    tags: string[];
    title: string;
    timezone: string[];
    uid: string;
    [prop: string]: any;
  }

  /**
   * Props for the Link component.
   */
  interface LinkProps {
    icon: string;
    tags: string[];
    type: string;
    [prop: string]: any;
  }

  /**
   * Props for the Panel component.
   */
  interface PanelProps {
    datasource: string;
    title: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    options: object;
    [prop: string]: any;
  }

  /**
   * Props for the Row component.
   */
  interface RowProps {
    collapsed: boolean;
    datasource: string;
    options: object;
    title: string;
    y: number;
    [prop: string]: any;
  }

  /**
   * Props for the Template component.
   */
  interface TemplateProps {
    allFormat: string;
    allValue: any;
    current: {
      isNone: boolean;
      selected: boolean;
      text: string;
      value: string;
    };
    datasource: string;
    definition: string;
    hide: number;
    includeAll: boolean;
    index: number;
    label: string;
    multi: boolean;
    multiFormat: any;
    name: string;
    options: any[];
    query: string;
    refresh: number;
    regex: string;
    skipUrlSync: boolean;
    sort: number;
    tagValuesQuery: string;
    tags: string[];
    tagsQuery: string;
    type: string;
    useTags: boolean;
    [prop: string]: any;
  }

  /**
   * Props for the Templates component.
   */
  interface TemplatesProps {
    enable: boolean;
    [prop: string]: any;
  }

  /**
   * Props for the Time component.
   */
  interface TimeProps {
    from: string;
    to: string;
  }

  /**
   * Props for the TimePicker component.
   */
  interface TimePickerProps {
    collapse: boolean;
    enable: boolean;
    notice: boolean;
    now: boolean;
    refreshIntervals: string[];
    status: string;
    type: string;
    [prop: string]: any;
  }

  /**
   * @function Annotation
   *
   * Annotation Function Component for creating Grafana annotations JSON.
   *
   * @param {JsonJsx.PropsWithChildren<AnnotationProps>} props Annotation props.
   *
   * @returns {JsonJsx.Element<AnnotationProps>} Annotation JSON.
   */
  const Annotation: JsonJsx.FunctionComponent<AnnotationProps>;

  /**
   * @function Annotations
   *
   * Annotations Function Component for creating Grafana annotations JSON.
   *
   * @param {JsonJsx.PropsWithChildren<AnnotationProps>} props Annotations props.
   *
   * @returns {JsonJsx.Element<AnnotationProps>} Annotations JSON.
   */
  const Annotations: JsonJsx.FunctionComponent<AnnotationsProps>;

  /**
   * @function Dashboard
   *
   * Dashboard Function Component for creating Grafana dashboard JSON.
   *
   * @param {JsonJsx.PropsWithChildren<AnnotationProps>} props Dashboard props.
   *
   * @returns {JsonJsx.Element<AnnotationProps>} Dashboard JSON.
   */
  const Dashboard: JsonJsx.FunctionComponent<DashboardProps>;

  /**
   * @function Link
   *
   * Link Function Component for creating Grafana links JSON.
   *
   * @param {JsonJsx.PropsWithChildren<LinkProps>} props Link props.
   *
   * @returns {JsonJsx.Element<LinkProps>} Link JSON.
   */
  const Link: JsonJsx.FunctionComponent<LinkProps>;

  /**
   * @function Links
   *
   * Links Function Component for creating Grafana links JSON.
   *
   * @param {JsonJsx.PropsWithChildren} props Links props.
   *
   * @returns {JsonJsx.Element} Links JSON.
   */
  const Links: JsonJsx.FunctionComponent;

  /**
   * @function Panel
   *
   * Panel Function Component for creating Grafana panel JSON.
   *
   * @param {JsonJsx.PropsWithChildren<PanelProps>} props Panel props.
   *
   * @returns {JsonJsx.Element<PanelProps>} Panel JSON.
   */
  const Panel: JsonJsx.FunctionComponent<PanelProps>;

  /**
   * @function Panels
   *
   * Panels Function Component for creating Grafana panels JSON.
   *
   * @param {JsonJsx.PropsWithChildren} props Panels props.
   *
   * @returns {JsonJsx.Element} Panels JSON.
   */
  const Panels: JsonJsx.FunctionComponent;

  /**
   * @function Row
   *
   * Row Function Component for creating Grafana row panel JSON.
   *
   * @param {JsonJsx.PropsWithChildren<RowProps>} props Row props.
   *
   * @returns {JsonJsx.Element<RowProps>} Row JSON.
   */
  const Row: JsonJsx.FunctionComponent<RowProps>;

  /**
   * @function Template
   *
   * Template Function Component for creating Grafana templating JSON.
   *
   * @param {JsonJsx.PropsWithChildren<TemplateProps>} props Template props.
   *
   * @returns {JsonJsx.Element<TemplateProps>} Template JSON.
   */
  const Template: JsonJsx.FunctionComponent<TemplateProps>;

  /**
   * @function Templates
   *
   * Templates Function Component for creating templating JSON.
   *
   * @param {JsonJsx.PropsWithChildren} props Templates props.
   *
   * @returns {JsonJsx.Element} Templates JSON.
   */
  const Templates: JsonJsx.FunctionComponent;

  /**
   * @function Time
   *
   * Time Function Component for creating Grafana time JSON.
   *
   * @param {JsonJsx.PropsWithChildren<TimeProps>} props Time props.
   *
   * @returns {JsonJsx.Element<TimeProps>} Time JSON.
   */
  const Time: JsonJsx.FunctionComponent<TimeProps>;

  /**
   * @function TimePicker
   *
   * TimePicker Function Component for creating Grafana timepicker JSON.
   *
   * @param {JsonJsx.PropsWithChildren<TimePickerProps>} props TimePicker props.
   *
   * @returns {JsonJsx.Element<TimePickerProps>} TimePicker JSON.
   */
  const TimePicker: JsonJsx.FunctionComponent<TimePickerProps>;

  /**
   * @function createGrafanaJsxString
   *
   * Takes Grafana Dashboard JSON and creates a string of JSX using
   * `grafana-jsx` components which can be written to a `.jsx` file
   * for creating the dashboard.
   *
   * @param json Grafana Dashboard JSON to convert to a JSX string.
   *
   * @returns {string} A string of Grafana JSX for the provided JSON.
   */
  function createGrafanaJsxString(json: object): string;
}

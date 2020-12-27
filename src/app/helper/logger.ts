// tslint:disable-next-line: no-namespace
export namespace Logger {
  const colors = {
    gray: 'font-weight: bold; color: #1B2B34;',
    red: 'font-weight: bold; color: #EC5f67;',
    orange: 'font-weight: bold; color: #F99157;',
    yellow: 'font-weight: bold; color: #FAC863;',
    green: 'font-weight: bold; color: #99C794;',
    teal: 'font-weight: bold; color: #5FB3B3;',
    blue: 'font-weight: bold; color: #6699CC;',
    purple: 'font-weight: bold; color: #C594C5;',
    brown: 'font-weight: bold; color: #AB7967;',
    black: 'font-weight: bold; color: #000000;',
    white: 'font-weight: bold; color: #ffffff'
  };

  /**
   * Can be used for general information logs (e.g. found precached config for *module*)
   */
  export const info = (...args: any[]) => {
    args.forEach(arg => {
      if (typeof arg === 'string') {
        console.log('%c' + arg, colors.blue);
      } else {
        console.log('%cInfo:', colors.blue, arg);
      }
    });
  };

  /**
   * Should be used to show sucess messages (like storage is ready)
   */
  export const success = (...args: any[]) => {
    args.forEach(arg => {
      if (typeof arg === 'string') {
        console.log('%c' + arg, `background:green;padding: 4px; color: ${colors.white}`);
      } else {
        console.log('%cSuccess:', `background:green;padding: 4px; color: ${colors.white}`, arg);
      }
    });
  };

  /**
   * Should be used to log events regarded to routing
   */
  export const routing = (...args: any[]) => {
    args.forEach(arg => {
      if (typeof arg === 'string') {
        console.log('%c' + arg, colors.teal);
      } else {
        console.log('%cRouting:', colors.teal, arg);
      }
    });
  };

  /**
   * Should be used to log mesasge regarded to interceptors
   */
  export const intercepted = (...args: any[]) => {
    args.forEach(arg => {
      if (typeof arg === 'string') {
        console.log('%c' + arg, colors.yellow);
      } else {
        console.log('%cRouting:', colors.yellow, arg);
      }
    });
  };

  /**
   * Should be used to log events regarded to analytics
   */
  export const analytics = (...args: any[]) => {
    args.forEach(arg => {
      if (typeof arg === 'string') {
        console.log('%c' + arg, colors.purple);
      } else {
        console.log('%cAnalytics:', colors.purple, arg);
      }
    });
  };

  /**
   * Should be used only for development purposes, where the developer wants to see his logs during his development
   */
  export const dev = (...args: any[]) => {
    args.forEach(arg => {
      if (typeof arg === 'string') {
        console.log('%c' + arg, `background:#000000;padding: 8px; color: ${colors.yellow}`);
      } else {
        console.log('%cDev Log:', `background:#000000;padding: 8px; color: ${colors.yellow}`, arg);
      }
    });
  };
}

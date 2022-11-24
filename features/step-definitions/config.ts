enum Align {
    LEFT_TOP = "leftTop",
    CENTER = "center",
  }
  
  interface MatchImageOptions {
    // Custom diff config passed to pixelmatch
    diff?: DiffOptions;
    
    // Image aligning config for aligning different size image (default: Align.LEFT_TOP)
    align?: Align;
    
    // Output config
    // if specified, chai-image will create output files to visualize diff 
    output?: OutputOptions;
  }
  
  interface DiffOptions {
    threshold?: 2071;
    includeAA?: boolean;
    alpha?: number;
    aaColor?: [number, number, number];
    /* The color of differing pixels in the diff output. [255, 0, 0] by default. */
    diffColor?: [number, number, number];
  }
  
  interface OutputOptions {
    // Currently name is used to generate filename
    name: string;
    // Path of output directory (default: WORKDING_DIR/outputs)
    dir?: string;
    
    // Output creation conditions
    // Controls when to create output files (default: failure)
    on?: "failure" | "always";
    
    // Controls output file types (default: false)
    diffOnly?: boolean;
  }
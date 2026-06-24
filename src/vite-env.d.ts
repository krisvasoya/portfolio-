/// <reference types="vite/client" />

// 3D Asset Declarations
declare module '*.glb' {
  const src: string;
  export default src;
}

declare module '*.gltf' {
  const src: string;
  export default src;
}

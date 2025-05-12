"use client"
import React from 'react'

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer
} from "@codesandbox/sandpack-react";

function CodeView() {
  return (
    <div>
      <div className='flex justify-between items-center bg-[#181818] rounded-t-2xl '>
        <div className='flex items-center gap-4 p-2 text-white '>
          <h2 className='border bg-[#282828] cursor-pointer rounded-2xl p-1'>
            Code Editor
          </h2>
          <h2 className='border bg-[#282828] cursor-pointer rounded-2xl p-1'>
            Preview
          </h2>
        </div>
      </div>
  <SandpackProvider  theme={"dark"}>
    <SandpackLayout>
    <SandpackFileExplorer className='min-h-[76vh] ' />
      <SandpackCodeEditor className='min-h-[76vh]' />
      <SandpackPreview className='min-h-[76vh]' />
    </SandpackLayout>
  </SandpackProvider>
    </div>
  )
}

export default CodeView
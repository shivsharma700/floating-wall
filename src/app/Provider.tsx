import { Toaster } from '@/components/ui/sonner'
import React from 'react'

export default function Provider({children}:any) {
  return (
    <>
    <Toaster/>
    {children}
    </>
  )
}

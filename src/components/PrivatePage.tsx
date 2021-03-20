import { NextComponentType } from "next";
import { Component, ComponentType, ReactNode } from "react"
import { useAuth } from '../hooks/useAuth';

interface Props {
  children: ReactNode
}

export default function PrivatePage({ children }: Props) {

  const { user, signUp } = useAuth()

  if(!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
    {children}
    </div>
  )
}
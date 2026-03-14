import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test-room/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/test-room/test"!</div>
}

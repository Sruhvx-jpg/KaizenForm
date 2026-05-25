import { SiteHeader } from "~/components/site-header"
import { AppSidebar } from "~/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "~/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Forms</h1>
          <p className="mt-2 text-sm text-muted-foreground">This is the Forms page.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

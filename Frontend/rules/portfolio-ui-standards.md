# Portfolio UI & Modal Standards

## 1. Responsive Media & Preview Modals
- **Never Hide Critical Actions on Hover**: Core metadata (title, issuer, date) and primary actions (Verify Credential, Download, Close) must always be accessible without hovering. On mobile and touch screens, hover states do not fire predictably.
- **Responsive Modal Viewports**:
  - Use `h-[90vh]` or `max-h-[92dvh]` with mobile-first layouts (`flex-col md:flex-row` or media-first layout with persistent bottom toolbar/drawer).
  - Constrain typography on mobile: Avoid massive `text-7xl` headlines inside modals that cause layout overflow on smaller viewports.
- **Modal Interactivity**:
  - Always lock body scroll (`document.body.style.overflow = "hidden"`) while open.
  - Support `Escape` key to close.
  - Support previous/next keyboard navigation (`ArrowLeft` / `ArrowRight`) when previewing from an item collection.
  - Provide a clear, accessible close button with `aria-label="Close preview"`.

## 2. Card Media Sizing in Bento / Dashboard Layouts
- Inside flex column cards that expand to fill dashboard height, use `flex-1 min-h-0 w-full` with `object-cover` or `object-contain` for image containers to prevent unwanted dead space.
- Progress/time bars should only be added if requested; prefer clean, centered pagination dots.

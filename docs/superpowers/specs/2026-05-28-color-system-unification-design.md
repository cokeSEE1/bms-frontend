# Color System Unification

**Date**: 2026-05-28
**Status**: approved

## Problem

Two competing color palettes exist: brand warm tones (login page) vs cool blue tones (dashboard). Color constants are duplicated across 5 component style files.

## Design

### Color Mapping

All blue-toned values replaced with brand deep-teal derivatives. Gold becomes the accent/emphasis color.

```
Active/selected:  #005096 → #1a3a4a (COLOR_PRIMARY)
Emphasis/link:    unchanged #c8a96e (COLOR_LINK)
Body text:        rgba(0,14,26,.95) → #2c3e50 (COLOR_TEXT)
Secondary text:   rgba(0,14,26,.65) → #7f8c8d (COLOR_TEXT_SECONDARY)
Placeholder:      rgba(0,14,26,.45) → rgba(44,62,80,.45) (new constant)
Cool surfaces:    #f5faff/#f9faff → #F3F6F8 (new: COLOR_SURFACE_COOL)
Cool borders:     #ebf5ff → #E3E9ED (new: COLOR_BORDER_COOL)
Warm cards:       #F5FAFF → #F5F3EC (new: COLOR_SURFACE_WARM)
Generic borders:  #EBEDF2 → #E8E2D8 (new: COLOR_BORDER_WARM)
Search bg:        rgba(0,14,26,.08) → rgba(26,58,74,.08) (new constant)
```

### New Shared Constants in colors.ts

```
COLOR_ACTIVE (alias for COLOR_PRIMARY)
COLOR_TITLE (alias for COLOR_TEXT)
COLOR_META (alias for COLOR_TEXT_SECONDARY)
COLOR_PLACEHOLDER
COLOR_SURFACE_COOL
COLOR_BORDER_COOL
COLOR_SURFACE_WARM
COLOR_BORDER_WARM
COLOR_SEARCH_BG
COLOR_SEARCH_ICON (#5B6275, kept as-is — neutral gray)
COLOR_BTN_PRIMARY_BG (gradient start/end)
```

### Affected Files

| File | Change |
|------|--------|
| `src/theme/colors.ts` | Add 11 shared constants |
| `src/pages/home/components/HomeHeader/style.ts` | Replace 7 local constants with imports |
| `src/pages/home/components/HomeSidebar/style.ts` | Replace 10 local constants with imports |
| `src/pages/home/components/KnowledgeWaterfall/style.ts` | Replace 6 local constants with imports |
| `src/pages/home/components/PersonalWorkspace/style.ts` | Replace 8 local constants with imports |
| `src/pages/home/components/RankingPanel/style.ts` | Replace 5 local constants with imports |

### Non-goals

- Not changing component structure or behavior
- Not adding new features
- Not changing layout

import { useMemo } from 'react'

export function useDayPhase(week) {
  return useMemo(() => (week % 2 === 0 ? 'night' : 'day'), [week])
}

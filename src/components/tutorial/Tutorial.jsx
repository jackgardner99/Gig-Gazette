import { useState } from 'react'

const STEPS = [
    {
        icon: 'fas fa-map-marked-alt',
        title: 'Welcome to Gig Gazette™',
        content: 'Your guide to live music in Nashville. This quick tour will show you everything you can do on the map.',
    },
    {
        icon: 'fas fa-map-pin',
        title: 'The Gig Map',
        content: 'The map shows every venue in Nashville that has upcoming live events. Click any marker to see the venue\'s details and what\'s on.',
    },
    {
        icon: 'fas fa-palette',
        title: 'Color-Coded Markers',
        content: 'Each marker color tells you what kind of event is happening at that venue.',
        legend: [
            { color: '#e8a020', icon: 'fas fa-star',       label: 'Shows' },
            { color: '#7c3aed', icon: 'fas fa-microphone', label: 'Open Mics' },
            { color: '#db2777', icon: 'fas fa-pen',        label: 'Writers Rounds' },
            { color: '#16a34a', icon: 'fas fa-sync',       label: 'Recurring Shows' },
            { color: '#2dd4bf', icon: 'fas fa-music',      label: 'Multiple Types' },
        ],
    },
    {
        icon: 'fas fa-filter',
        title: 'Filter by Event Type',
        content: 'Use the event type checkboxes in the filter panel to show or hide specific types on the map. All types are visible by default.',
    },
    {
        icon: 'fas fa-sliders-h',
        title: 'Venue Filters',
        content: 'Narrow your search further by noise level, amenities like food and parking, bar type, free entry, and more.',
    },
    {
        icon: 'fas fa-store',
        title: 'Venue Details',
        content: 'Click a marker on the map, then tap "View Events" to open the venue card — full address, amenities, upcoming events, and ticket links all in one place.',
    },
    {
        icon: 'fas fa-camera',
        title: 'Event Details',
        content: 'Open any event\'s detail page to browse photos from past shows. Sign in to upload your own photos and share the experience.',
    },
    {
        icon: 'fas fa-music',
        title: 'Submit Your Events',
        content: 'Sign in to add your own shows, open mics, or writers rounds to the map. Your events will be visible to everyone exploring Nashville\'s live music scene.',
    },
]

export const Tutorial = ({ open, onClose }) => {
    const [step, setStep] = useState(0)

    if (!open) return null

    const current = STEPS[step]
    const isFirst = step === 0
    const isLast = step === STEPS.length - 1

    const handleNext = () => {
        if (isLast) {
            setStep(0)
            onClose()
        } else {
            setStep(s => s + 1)
        }
    }

    const handleBack = () => setStep(s => s - 1)

    const handleSkip = () => {
        setStep(0)
        onClose()
    }

    return (
        <div className="tutorial-overlay" onClick={handleSkip}>
            <div className="tutorial-card" onClick={e => e.stopPropagation()}>
                <div className="tutorial-icon">
                    <i className={current.icon}></i>
                </div>

                <div className="tutorial-step-count">{step + 1} of {STEPS.length}</div>

                <h2 className="tutorial-title">{current.title}</h2>
                <p className="tutorial-content">{current.content}</p>

                {current.legend && (
                    <div className="tutorial-legend">
                        {current.legend.map(({ color, icon, label }) => (
                            <div key={label} className="tutorial-legend-item">
                                <div className="tutorial-pill" style={{ background: color }}>
                                    <i className={icon}></i>
                                </div>
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="tutorial-dots">
                    {STEPS.map((_, i) => (
                        <button
                            key={i}
                            className={`tutorial-dot ${i === step ? 'tutorial-dot--active' : ''}`}
                            onClick={() => setStep(i)}
                        />
                    ))}
                </div>

                <div className="tutorial-actions">
                    <button className="btn btn--secondary btn--sm" onClick={handleSkip}>
                        Skip tour
                    </button>
                    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                        {!isFirst && (
                            <button className="btn btn--secondary btn--sm" onClick={handleBack}>
                                ← Back
                            </button>
                        )}
                        <button className="btn btn--primary btn--sm" onClick={handleNext}>
                            {isLast ? 'Done' : 'Next →'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

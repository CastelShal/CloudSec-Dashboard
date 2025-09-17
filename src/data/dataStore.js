import { create } from 'zustand';
import data from './mockData.json' with {type: 'json'};

data.sections.forEach(section => {
    section.widgets.forEach((widget, idx) => widget.visible = idx < 2)
})

const dataStore = (set, get) => ({
    sections: data.sections,

    toggleWidget: (sectionTitle, widgetId) => {
        const newSections = get().sections
            .map(section => {
                if (section.title === sectionTitle) {
                    return {
                        ...section,
                        widgets: section.widgets
                            .map(widget => {
                                if (widget.widgetId === widgetId) {
                                    return {
                                        ...widget,
                                        visible: !widget.visible
                                    };
                                }
                                return widget;
                            })
                    };
                }
                return section;
            });

        set({
            sections: newSections
        });
        console.log("set widget " + widgetId + " to invisible");
    }
});

const useDataStore = create(dataStore)
export default useDataStore;
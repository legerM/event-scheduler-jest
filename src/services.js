
import EventRepository from "./repository";
import Event from "./models";

export default class EventService {

    /**
     * The event repository
     * @type {EventRepository}
     */
    _eventRepository;

    /**
     *
     * @param {EventRepository} eventRepository
     */
    constructor(eventRepository) {
        this._eventRepository = eventRepository;
    }

    /**
     * Return all events
     * @return {Event[]}
     */
    getEvents() {
        return this._eventRepository.getAll();
    }

    /**
     * Get the first upcomming event
     * @return {Event}
     */
    getFirstEvent() {
        let listEvents = this.getCheckedList();
        const sortedEvents = listEvents.sort((a, b) => a.startTime - b.startTime);
        return sortedEvents[0];
    }

    getCheckedList() {
        let listEvents = this.getEvents();
        for (let i = 0; i < listEvents.length; i++) {
            const event = listEvents[i];
            if (event.getStartTime() > event.getEndTime()) {
                let startTimeEvent = event.startTime;
                event.startTime = event.endTime;
                event.endTime = startTimeEvent;
            }
        }
        return listEvents;
    }

    /**
     * Get the last upcomming event
     * @return {Event}
     */
    getLastEvent() {
        let listEvents = this.getCheckedList();
        const sortedEvents = listEvents.sort((a, b) => b.startTime - a.startTime);

        return sortedEvents[0];
    }

    /**
     * Get the longest event
     * @return {Event}
     */
    getLongestEvent() {
        let listEvents = this.getCheckedList();
        const sortedEvents = listEvents.sort((a, b) => ((a.startTime - a.endTime) - (b.startTime - b.endTime)));
        //console.log(sortedEvents);
        return sortedEvents[0];
    }

    /**
     * get the shortest event
     * @return {Event}
     */
    getShortestEvent() {
        let listEvents = this.getCheckedList();
        //console.log(listEvents);
        const sortedEvents = listEvents.sort((a, b) => ((b.startTime - b.endTime) - (a.startTime - a.endTime)));
        //console.log(sortedEvents);
        return sortedEvents[0];
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     * @return {Event[]}
     */
    hasEventOn(time) {
        let evts = this._eventRepository.getAll();
        return evts.filter(function (e) {
            return time >= e.getStartTime() && time <= e.getEndTime();
        });
    }

    // A implementer en TDD
    /**
     *
     * @param title
     * @return {null | Event}
     */
    getEventByTitle(title) {
        return null
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     */
    isLocationAvailable(time) {
    }

    /**
     * Get current events
     * @return {Event[]}
     */
    getCurrentEvents() {
        let now = Date.now();
        console.log(now);
        return this.hasEventOn(new Date(now));
    }

}
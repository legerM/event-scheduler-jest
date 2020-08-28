import Event from "../src/models";
import EventRepository from "../src/repository";
import EventService from "../src/services";
jest.mock("../src/repository");

describe("Event Service", () => {

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        EventRepository.mockClear();
        EventRepository.mockImplementation(() => {
            return {
                getAll: () => fakeEvents.slice()
            }
        });
        jest
            .spyOn(global.Date, 'now')
            .mockImplementation(() =>
                new Date('2020-04-01T09:00:00').valueOf()
            );
    });

    let fakeEvents = [
        new Event(new Date('2019-12-17T03:24:00'), new Date('2019-12-17T13:24:00'), "Hello World", "Campus Numerique", "This is an hello world.."),
        new Event(new Date('2018-12-17T03:24:00'), new Date('1995-12-17T03:24:00'), "First event", "Campus Numerique", "This is an hello world.."),
        new Event(new Date('2020-04-01T09:00:00'), new Date('2020-04-01T17:00:00'), "Unit test againt", "Campus Numerique", "This is an hello world..")
    ];

    test('getEvents shall call repository', async () => {
        let eventService = new EventService(new EventRepository());
        eventService.getEvents();
        expect(EventRepository).toHaveBeenCalledTimes(1);
    })

    test('getEvents shall return 3 result', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEvents().length).toBe(3);
    })

    test('getFirstEvent() shall return the first Event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getFirstEvent()).toBe(fakeEvents[1]);
    })

    test('getLastEvent() shall return the last Event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLastEvent()).toBe(fakeEvents[2]);
    })

    test('getLongestEvent() shall return the longest Event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLongestEvent()).toBe(fakeEvents[1]);
    })

    test('getShortestEvent() shall return the shortest Event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getShortestEvent()).toBe(fakeEvents[2]);
    })

    test('hasEventOn() shall return the Event at the time(param) ', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.hasEventOn(new Date('2019-12-17T03:24:00'))).toStrictEqual([fakeEvents[0]]);
    })

    test('getEventByTitle() shall return the Title of the Event ', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEventByTitle("Hello World").toBe(fakeEvents[0]));
    })

    test('isLocationAvailable() shall return the Location of the Event ', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.isLocationAvailable("Campus Numerique").toBe(fakeEvents[0]));
    })


    test(' getCurrentEvents()  shall return the Event from the current date  ', async () => {
        let eventService = new EventService(new EventRepository());

        expect(eventService.getCurrentEvents().toBe('2020-04-01T09:00:00'));
    })
});
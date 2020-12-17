import { FilterObserver } from "./filter-observer";

export interface FilterSubject {
    subscribe(observer: FilterObserver): void;
    unsubscribe(observer: FilterObserver): void;
    notify(): void;
}

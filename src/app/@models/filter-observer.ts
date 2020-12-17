import { FilterSubject } from "./filter-subject";

export interface FilterObserver {
    update(subject: FilterSubject): void;
}

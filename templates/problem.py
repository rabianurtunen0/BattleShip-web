class problem:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        sorted_intervals = sorted(intervals, key=lambda x: x[1])
        upper_boundary = float('-inf')
        discard_intervals = 0
        for start, end in sorted_intervals:
            if start >= upper_boundary:
                upper_boundary = end
            else:
                discard_intervals += 1

        return discard_intervals
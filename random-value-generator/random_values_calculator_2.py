import math
import random


class Constants():
    def __init__(self):
        # self.a0 = 0.2
        # self.a1 = 0.5
        # self.a2 = 0.15
        # self.a3 = 0.15
        self.a0 = 0.05
        self.a1 = 0.65
        self.a2 = 0.25
        self.a3 = 0.05
        mana0 = 3389.0
        mana1 = 15998.0
        mana2 = 1891.0
        mana3 = 313.0
        mana4 = 11.0
        mana5 = 33.0
        total = mana0 + mana1 + mana2 + mana3 + mana4 + mana5
        mana0percent = mana0/total
        mana1percent = mana1/total
        mana2percent = mana2/total
        mana3percent = mana3/total
        mana4percent = mana4/total
        mana5percent = mana5/total
        self.manapercent = [mana0percent,
                            mana1percent,
                            mana2percent,
                            mana3percent,
                            mana4percent,
                            mana5percent,
        ]

constants = Constants()
print("Manapercent: ", constants.manapercent)

TABLE = [
    [constants.a0, 0,0,0,0,0],
    [0.6, 0.5, 0,0,0,0],
    [1.1, 0.5, 0.5, 0,0,0],
    [0.012, 0.05, 0.9, constants.manapercent[3], constants.manapercent[4], constants.manapercent[5]]
]

def table_print(table):
    print(table[0], "\n",
    table[1], "\n",
    table[2], "\n",
    table[3]
          )

def swag_table_print(table):
    new_table = []
    for tb in table:
        tb1 = []
        for elem in tb:
            tb1.append(round(elem,3))
        new_table.append(tb1)
        print(tb1)

def swag_table_print_pull_chance_related(table):
    new_table = []
    for i, tb in enumerate(table):
        tb1 = []
        for elem in tb:
            if i==0:
                elem /= constants.a0
            if i==1:
                elem /= constants.a1
            if i==2:
                elem /= constants.a2
            if i==3:
                elem /= constants.a3
            elem = round(elem,3)
            elem *= 100
            tb1.append(round(elem,1))
        new_table.append(tb1)
        print(tb1)


class Solution():
    def __init__(self, table):
        self.table = [
            table[0][:],
            table[1][:],
            table[2][:],
            table[3][:]
        ]
        self.score = 9999999999999.0

    def _sumcolumn(self, table, column):
        return table[0][column] + table[1][column] + table[2][column] + table[3][column]

    def _sumrow(self, table, row):
        return table[row][0] + table[row][1] + table[row][2] + table[row][3] + table[row][4] + table[row][5]

    def evaluate(self):
        table = self.table
        score = 0
        score += math.fabs(self._sumcolumn(table, 0) - constants.manapercent[0])
        score += math.fabs(self._sumcolumn(table, 1) - constants.manapercent[1])
        score += math.fabs(self._sumcolumn(table, 2) - constants.manapercent[2])
        score += math.fabs(self._sumrow(table, 1) - constants.a1)
        score += math.fabs(self._sumrow(table, 2) - constants.a2)
        score += math.fabs(self._sumrow(table, 3) - constants.a3)
        self.score = score

    def randomize(self, delta):
        for itr in range(random.randint(1, 10)):
            xi = random.randint(1,3)
            xj = random.randint(0,2)
            if xi == 1 and xj == 2:
                continue
            if xi == 3 and xj == 0:
                continue
            delta2 = random.random()*delta - delta/2
            value = self.table[xi][xj] + delta2
            if 0 < value < 1:
                self.table[xi][xj] = value

    def print_details(self):
        for i in range(4):
            print(self._sumrow(self.table, i))
        print("")
        for i in range(4):
            print(self._sumcolumn(self.table, i))

    # def print_first_column_score(self):
    #     print("First column score: ", math.fabs(self._sumcolumn(self.table, 0) - constants.manapercent[0]))


delta = 0.25

score = 99999999999.9
leading_solution = Solution(TABLE)
new_table = TABLE
for i in range(50):
    results = []
    for j in range(5000+i*10):
        solution = Solution(new_table)
        solution.randomize(delta)
        solution.evaluate()
        results.append(solution)
    results.sort(key= lambda x: x.score)
    new_leading_solution = results[0]
    if new_leading_solution.score < leading_solution.score:
        leading_solution = new_leading_solution
        new_table = leading_solution.table
        # leading_solution.print_first_column_score()
        print("Continuing iteration")
    else:
        delta /= 1.1
        if delta == 0.0:
            break
        print("Iteration: ", i, " Bad result, lowering delta. New delta = ", delta)

print("Manapercent: ", constants.manapercent)

# print(results[-1].score)
print("Solution accuracy: ", results[0].score)
print("Solution: ")
swag_table_print(results[0].table)
print("Inside pool:")
swag_table_print_pull_chance_related(results[0].table)
# results[0].print_details()

# table_print(TABLE)

export const winCombos = [
    [
        0, 1, 2,
        {
            Ax: "b.left",
            Ay: "b.top + ((b.bottom-b.top)/6)",
            Bx: "b.right",
            By: "b.top+((b.bottom-b.top)/6)"
        }
    ],
    [
        3, 4, 5,
        {
            Ax: "b.left",
            Ay: "b.top + ((b.bottom-b.top)/2)",
            Bx: "b.right",
            By: "b.top+((b.bottom-b.top)/2)"
        }
    ],
    [
        6, 7, 8,
        {
            Ax: "b.left",
            Ay: "b.top + ((b.bottom-b.top)*5/6)",
            Bx: "b.right",
            By: "b.top+((b.bottom-b.top)*5/6)"
        }
    ],
    [
        0, 3, 6,
        {
            Ax: "b.left + ((b.right-b.left)/6)",
            Ay: "b.top",
            Bx: "b.left + ((b.right-b.left)/6)",
            By: "b.bottom"
        }
    ],
    [
        1, 4, 7,
        {
            Ax: "b.left + ((b.right-b.left)/2)",
            Ay: "b.top",
            Bx: "b.left + ((b.right-b.left)/2)",
            By: "b.bottom"
        }
    ],
    [
        2, 5, 8,
        {
            Ax: "b.left + ((b.right-b.left)*5/6)",
            Ay: "b.top",
            Bx: "b.left + ((b.right-b.left)*5/6)",
            By: "b.bottom"
        }
    ],
    [
        0, 4, 8,
        { Ax: "b.left", Ay: "b.top", Bx: "b.right", By: "b.bottom" }
    ],
    [
        6, 4, 2,
        { Ax: "b.left", Ay: "b.bottom", Bx: "b.right", By: "b.top" }
    ]
];

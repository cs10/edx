//[('m', 50), ('t', 90), ('m', 50), ('t', 90), ('m', 50), ('t', 90), ('m', 50), ('t', 90)]

x = 0;
y = 0;
direction = 0;
angle = 0;
corner = 1;
sides = 0;
numMoves = 0;

function turn(deg) {
    direction = (direction + deg[1]) % 360;
}

function move(steps) {
    direction = direction % 360;
    sine = Math.sin(2 * Math.PI * direction / 360);
    cosine = Math.cos(2 * Math.PI * direction / 360);
    x += Math.round(cosine * steps[1]);
    y += Math.round(sine * steps[1]);
    numMoves += 1;
}

function expected_point(point) {
    return point == points[corner];
}

function get_next_action(actions) {
    return actions.shift();
}

function is_move(action) {
    return action[0] == "m";
}

function is_turn(action) {
    return action[0] == "t";
}

function generate_points(actions) {
    size = get_size(actions);
    angle = get_angle(actions);
    points = [[0, 0]];
    for (var i = 0; i < sides - 1; i += 1) {
        points.push(next_pos(points[i], Math.round(expected_angle * i)));
    }
    points.push([0, 0]);
}

function next_pos(pos, thedir) {
    thedir = thedir % 360;
    x2 = pos[0];
    y2 = pos[1];
    sine = Math.sin(2 * Math.PI * thedir / 360);
    cosine = Math.cos(2 * Math.PI * thedir / 360);
    x2 += Math.round(cosine * size);
    y2 += Math.round(sine * size);
    return [x2, y2];
}

function get_size(actions) {
    for (var i = 0; i < actions.length; i += 1) {
        if (is_move(actions[i])) {
            return actions[i][1];
        }
    }
    return 0;
}

function get_angle(actions) {
    for (var i = 0; i < actions.length; i += 1) {
        if (is_turn(actions[i])) {
            return actions[i][1];
        }
    }
    return 0;
}

function convert(x) {
    var list = x.split("\n");
    list = list.slice(0, list.length - 1);
    for (var i = 0; i < list.length; i += 1) {
        list[i] = list[i].split(".");
        list[i] = list[i].splice(1);
        list[i] = list[i][0].split(":");
        list[i][1] = parseInt(list[i][1]);
    }
    return list;
}

function test_polygon(actions, numSides) {
    var message = "Your function works correctly!";
    numMoves = 0;
    expected_angle = Math.round((360 / numSides) * Math.max(Math.min(1, get_angle(actions)), -1));
    direction = 0;
    corner = 1;
    sides = numSides;
    x = 0;
    y = 0;
    generate_points(actions, sides);
    while (actions.length > 0) {
        cur_action = get_next_action(actions);
        if (is_move(cur_action)) {
            move(cur_action);
            if (x != points[corner][0] || y != points[corner][1]) {
                message = "Your function is not working correctly.";
                break;
            }
            corner += 1;
        } else {
            turn(cur_action);
        }
    }
    if (numMoves != numSides) {
        message = "Your function is not working correctly";
    }
    alert(message);
}

try {
    test_polygon(convert(logFile), n);
} catch (error) {
    alert("Your function isn't working correctly.");
}


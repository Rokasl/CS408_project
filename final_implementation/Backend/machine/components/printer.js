var Printer = function printer(v) {
    return valString(v, false, false);

    function cdrString(v) {
        switch (v.tag) {
            case "pair":
                return valString(v.car) + cdrString(v.cdr);
            case "atom":
                if (v.atom === "") {
                    return " "
                };
        }
        return "|" + valString(v);
    };


    function valString(v, cons, nil) {
        switch (v.tag) {
            case "atom":
                if (!v.atom || v.atom === "nil" || v.atom === "cons") {
                    return "";
                }
                return v.atom + " ";
            case "int":
                return v.int + " ";
                break;
            case "pair":
                return valString(v.car) + cdrString(v.cdr);
        }
    };
}



module.exports = Printer;
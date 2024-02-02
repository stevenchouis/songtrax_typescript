/**
 * The Bar to set the scale
 * @param {integer} barID The ID of the bar.
 * @param {boolean} barEnabled The value of whether the bar is enabled or not.
 * @param {function} handleBarClick The callback function to be called when the bar is clicked.
 * @returns The button representing the Bar.
 */
export function Bar({ barID, barEnabled, handleBarClick }) {

    /**
     * Toggle the class name of the bar.
     * @returns the class name to be set to the button for the bar.
     */
    function barSelected() {
        if (barEnabled) {
            return "toggle-selected";
        }
        return "toggle";
    }

    return (
        <button className={`bar bar-${barID} ${barSelected()}`} onClick={handleBarClick}></button>
    );
}
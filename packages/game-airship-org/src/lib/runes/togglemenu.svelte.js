export function toggleMenu() {
    let showmission = $state(true);

    return {
        get showMission() { return showmission },
        toggleMission: () => showmission = !showmission
    };
}

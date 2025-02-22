import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'udev-rules',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './udev-rules.component.html'
})
export class UdevRulesComponent implements OnChanges {
    @Input() udevFileContent: string;

    command = '';
    faCopy = faCopy;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.udevFileContent) {
            this.command = `cat <<EOF >/etc/udev/rules.d/50-uhk60.rules
${changes.udevFileContent.currentValue}
EOF
udevadm control --reload-rules
udevadm trigger
udevadm settle`;
        }
    }
}

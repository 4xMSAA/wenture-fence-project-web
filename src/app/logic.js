const DEFAULT_FENCE_LENGTH = 1
const DEFAULT_FENCE_ANGLE = 0
const DEFAULT_FENCE_COUNT = 4

const [MIN_ANGLE, MAX_ANGLE] = [-180, 180]
const MIN_LENGTH = 0.01

export class Fence {
    #length = DEFAULT_FENCE_LENGTH
    #angle = DEFAULT_FENCE_ANGLE

    constructor(length = DEFAULT_FENCE_LENGTH, angle = DEFAULT_FENCE_ANGLE) {
        this.#length = length
        this.#angle = angle
    }

    get length() {
        return this.#length
    }

    set length(value) {
        this.#length = Math.max(value, MIN_LENGTH)
    }

    get angle() {
        return this.#angle
    }

    set angle(value) {
        this.#angle = Math.min(Math.max(value, MIN_ANGLE), MAX_ANGLE) 
    }
}

let logic_instance_counter = 0
export default class Logic {

    constructor(sendMessage, fenceCount = DEFAULT_FENCE_COUNT) {
        logic_instance_counter += 1;
        console.log("logic instances made:", logic_instance_counter)
        this.fences = []
        this.sendMessage = sendMessage

        for (let i = 0; i < fenceCount; i++) {
            this.addFence()
        }
    }

    addFence(length, angle) {
        this.fences.push(new Fence(length, angle))
    }
    addFenceUntilAtCount(count) {
        for (let i = this.fences.length; i < count; i++) {
            this.addFence()
        }
    }

    
    removeFence() {
        this.fences.pop()
    }

    removeFenceUntilAtCount(count) {
        for (let i = this.fences.length; i > count; i--) {
            this.removeFence()
        }
    }

    setFenceCount(count) {
        this.addFenceUntilAtCount(count)
        this.removeFenceUntilAtCount(count)
    }

    json() {
        let result = []
        for (let fence of this.fences) {
            result.push({length: fence.length, angle: fence.angle})
        }

        return JSON.stringify({fences: result})
    }

    syncToUnity() {
        this.sendMessage("FenceGroup", "SyncFromJSON", this.json())
    }
}

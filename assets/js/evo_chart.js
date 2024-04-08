/**
 * Represents a chart for displaying financial data.
 * @class
 */
class EvoChart {
    /**
     * Represents a chart object.
     * @constructor
     * @param {string} canvasId - The ID of the canvas element.
     * @param {Array} data - The data for the chart (OHLC format: [timestamp, open, high, low, close])
     * @param {number} width - The width of the chart.
     * @param {number} height - The height of the chart.
     * @param {string} lossColor - The color for loss values.
     * @param {string} gainColor - The color for gain values.
     */
    constructor(canvasId, data, width = -1, height = -1, lossColor = "#f23645", gainColor = "#089981", background = "#161a25") {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d', { alpha: false });
        this.data = data;
        this.width = width;
        this.height = height;
        this.lossColor = lossColor;
        this.gainColor = gainColor;
        this.background = background;
        this.canvas.style.backgroundColor = this.background;
        this.cursorPosition = null;

        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('touchmove', this.handleMouseMove.bind(this));

        this.refresh();
    }

    set Data(data) {
        this.data = data;
        this.refresh();
    }

    get Data() {
        return this.data;
    }

    set Width(width) {
        this.width = width;
        this.refresh();
    }

    get Width() {
        return this.width;
    }

    set Height(height) {
        this.height = height;
        this.refresh();
    }

    get Height() {
        return this.height;
    }

    set LossColor(lossColor) {
        this.lossColor = lossColor;
        this.refresh();
    }

    get LossColor() {
        return this.lossColor;
    }

    set GainColor(gainColor) {
        this.gainColor = gainColor;
        this.refresh();
    }

    get GainColor() {
        return this.gainColor;
    }

    /**
     * Refreshes the chart by drawing the background, candles, and price ruler.
     */
    refresh() {
        var { width, height, data, lossColor, gainColor } = this;

        //if width < 0 width is window.innerWidth
        if (width < 0) {
            width = window.innerWidth;
        }
        //if height < 0 height is window.innerHeight
        if (height < 0) {
            height = window.innerHeight;
        }

        const drawBackground = () => {
            // Draw background and loading
            this.ctx.clearRect(0, 0, width, height);
            this.ctx.fillStyle = 'white';
            this.ctx.font = '20px Arial';
            this.ctx.fillText('Loading...', 10, 50);

            // Clear loading
            if (data.length > 0) {
                // Clear only the loading text
                this.ctx.clearRect(0, 0, 100, 100);
                return true;
            } else {
                return false;
            }
        };

        const drawCandles = (max, candleWidth, candleHeight) => {
            data.forEach((candle, i) => {
                const open = candle[1];
                const high = candle[2];
                const low = candle[3];
                const close = candle[4];
                const x = i * candleWidth;
                const y = (max - close) * candleHeight;
                const w = candleWidth;
                const h = (close - open) * candleHeight;
                // Draw candle
                this.ctx.fillStyle = open > close ? lossColor : gainColor;
                this.ctx.fillRect(x, y, w, h);
                // Also set color for lines
                this.ctx.strokeStyle = open > close ? lossColor : gainColor;
                // Draw high (a vertical line from close to high if close is higher than open, or from open to high if open is higher than close)
                this.ctx.beginPath();
                this.ctx.moveTo(x + w / 2, (max - high) * candleHeight);
                this.ctx.lineTo(x + w / 2, y + h);
                this.ctx.stroke();
                // Draw low (a vertical line from close to low if close is higher than open, or from open to low if open is higher than close)
                this.ctx.beginPath();
                this.ctx.moveTo(x + w / 2, (max - low) * candleHeight);
                this.ctx.lineTo(x + w / 2, y);
                this.ctx.stroke();
            });
        };

        const drawPriceRuler = (min, max, range, candleWidth, candleHeight) => {
            if (!data || data.length === 0) {
                return;
            }
            // Check if small screen
            const smallScreen = width < 500;
            const currentPrice = data[data.length - 1][4];
            if (!smallScreen) {
                // Draw a semi-transparent dashed horizontal line at the current price
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
                this.ctx.setLineDash([5, 3]);
                this.ctx.beginPath();
                this.ctx.moveTo(100, (max - currentPrice) * candleHeight);
                this.ctx.lineTo(width, (max - currentPrice) * candleHeight);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
            }
            // Draw cursorPosition {candle: number, price: number, date:Date}
            /*
                Draw vertical and horizontal semi-transparent more dashed lines at the current cursor position
                Write the date at the end of the vertical line
                Write the price at the start of the horizontal line
            */
            if (this.cursorPosition) {
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
                this.ctx.setLineDash([2, 2]);
                this.ctx.beginPath();
                this.ctx.moveTo(this.cursorPosition.candle * candleWidth, 0);
                this.ctx.lineTo(this.cursorPosition.candle * candleWidth, height);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.moveTo(0, (max - this.cursorPosition.price) * candleHeight);
                this.ctx.lineTo(width, (max - this.cursorPosition.price) * candleHeight);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
                this.ctx.font = 'bold 12px Arial';
                this.ctx.fillText(
                    new Date(
                        this.cursorPosition.date.getTime() -
                            this.cursorPosition.date.getTimezoneOffset() * 60000
                    )
                        .toISOString()
                        .replace('T', ' ')
                        .slice(0, 16),
                    this.cursorPosition.candle * candleWidth + 10,
                    height - 10
                );
                this.ctx.fillText(
                    this.cursorPosition.price.toFixed(2),
                    10,
                    (max - this.cursorPosition.price) * candleHeight - 10
                );
            }

            if (!smallScreen) {
                // Draw price level labels on the left side of the chart
                const priceLevels = [];
                for (let i = 0; i < 20; i++) {
                    priceLevels.push(min + (range * i) / 20);
                }
                priceLevels.forEach((priceLevel) => {
                    // Check if the price level distance to the current price is less than 1/40 of the range
                    if (Math.abs(priceLevel - currentPrice) < range / 40) {
                        return;
                    }
                    // Check if the price level position is less than 20px from the top or bottom of the chart
                    if (
                        (max - priceLevel) * candleHeight < 20 ||
                        (max - priceLevel) * candleHeight > height - 20
                    ) {
                        return;
                    }
                    // Check if the price level distance to the cursor position is less than 1/40 of the range
                    if (
                        this.cursorPosition &&
                        Math.abs(priceLevel - this.cursorPosition.price) < range / 20
                    ) {
                        return;
                    }
                    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.80)';
                    this.ctx.font = 'bold 10px Arial';
                    this.ctx.fillText(
                        priceLevel.toFixed(2),
                        10,
                        (max - priceLevel) * candleHeight + 5
                    );
                });
            }

            if (!smallScreen) {
                // Draw current price at the left side of the dashed line over dashed line in a semi-transparent black box with white 12px text
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
                this.ctx.fillRect(
                    0,
                    (max - currentPrice) * candleHeight - 20,
                    100,
                    40
                );
                this.ctx.fillStyle = 'black';
                this.ctx.font = 'bold 12px Arial';
                this.ctx.fillText(
                    currentPrice.toFixed(2),
                    10,
                    (max - currentPrice) * candleHeight + 5
                );
            } else {
                // Draw current price at the top of the chart in a semi-transparent black box with white 12px text
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
                this.ctx.fillRect(0, 0, 100, 32);
                this.ctx.fillStyle = 'black';
                this.ctx.font = 'bold 12px Arial';
                this.ctx.fillText(currentPrice.toFixed(2), 10, 20);
            }
        };

        const min = Math.min(...data.map((candle) => candle[3]));
        const max = Math.max(...data.map((candle) => candle[2]));
        const range = max - min;
        const candleWidth = width / data.length;
        const candleHeight = height / range;

        drawBackground();
        drawCandles(max, candleWidth, candleHeight);
        drawPriceRuler(min, max, range, candleWidth, candleHeight);
    }

    /**
     * Handles the mouse move event on the chart canvas.
     * Updates the cursor position and draws the price ruler.
     *
     * @param {MouseEvent|TouchEvent} e - The mouse event or touch event object.
     */
    handleMouseMove(e) {
        if (!this.canvas || !this.data.length) {
            return;
        }
        const rect = this.canvas.getBoundingClientRect();
        if (typeof e === 'object' && 'touches' in e) {
            e = e.touches[0];
        }
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        var { width, height } = this;
        //if width < 0 width is window.innerWidth
        if (width < 0) {
            width = window.innerWidth;
        }
        //if height < 0 height is window.innerHeight
        if (height < 0) {
            height = window.innerHeight;
        }

        if (x < 0 || x > width || y < 0 || y > height) {
            return;
        }
        const candleWidth = width / this.data.length;
        const candleHeight =
            height /
            (Math.max(
                ...this.data.map((candle) => candle[2])
            ) -
                Math.min(
                    ...this.data.map((candle) => candle[3])
                ));
        const currentCandle = Math.floor(x / candleWidth);
        const currentPrice =
            Math.max(...this.data.map((candle) => candle[2])) - y / candleHeight;
        const currentDate = new Date(this.data[currentCandle][0]);
        this.cursorPosition = {
            candle: currentCandle,
            price: currentPrice,
            date: currentDate,
        };
        const min = Math.min(...this.data.map((candle) => candle[3]));
        const max = Math.max(...this.data.map((candle) => candle[2]));
        const range = max - min;
    }
}
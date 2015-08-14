/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against application.
 */
/* Tests are placed within the $() function,
 * since some of these tests may require DOM elements
 * so that they don't run until the DOM is ready.
 */
$(function() {
    /* The first test suite. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in the application.
     */
		
    var x;
    describe('RSS Feeds', function() {
        /* First test: it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined and not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Second test: it loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        function check_url(feed) {
            it('url is defined and not empty', function() {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toEqual('');
            });
        }

        for (x = 0; x < allFeeds.length; x++) {
            check_url(allFeeds[x]);
        }

        /* Third test: loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        function check_name(feed) {
            it('name is defined and not empty', function() {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toEqual('');
            });
        }

        for (x = 0; x < allFeeds.length; x++) {
            check_name(allFeeds[x]);
        }
    });


    /* The second test suite : "The menu". 
     * This test suite is to test feed reader menu.
     */
    describe('The Menu', function() {

        /* The first test: ensures the menu element is
         * hidden by default. 
         */
        it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


        /* The second test: ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes its visibility when it is clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* The third test suite: "Initial Entries" 
     * This test suite is to test initial feed reader load function.
     */
    describe('Initial Entries', function() {
        /* The first test: ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Google Feed Reader API is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // load the first feed reader
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // check if there is entry element
        it('Check for minimum 1 entry element', function(done) {
            expect($('.entry').length).toBeGreaterThan(0);
            done();
        });

    });

    /* The fourth test suite: "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* The first test: ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var previousContent;

        // Capture previous content, then load the second feed reader 
        beforeEach(function(done) {
            previousContent = $('.feed').html();
            loadFeed(1, function() {
                done();
            });
        });

        // Compare the new content to previous content
        it('Changes the content display', function(done) {
            var newContent = $('.feed').html();
            expect(newContent).not.toBe(previousContent);
            done();
        });
    });
}());